const router = require('express').Router()
var parseMessage = require('gmail-api-parse-message')
const { gmail } = require('./oAuth2Client')

module.exports = router

router.get('/:orderid', async (req, res, next) => {
  try {
    const id = req.params.orderid
    let result = await listMessages(id)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.get('/single/:messageid', async (req, res, next) => {
  try {
    const id = req.params.messageid
    let result = await getMessage(id)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/createdraft', async (req, res, next) => {
  try {
    const obj = req.body
    let result = await createDraft(obj)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/sendconfirmation', async (req, res, next) => {
  try {
    const obj = req.body
    console.log('reqest to send an email', req.body)
    let result = await sendEmailConfirmation(obj)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

async function listMessages(id) {
  const userId = 'me'
  const query = `subject:${id}`

  var initialRequest = await gmail.users.messages.list({
    userId: userId,
    q: query,
  })

  let nextPage = initialRequest.data.nextPageToken

  var loopContinue = true
  let newArr = []
  async function Managework() {
    while (loopContinue) {
      await doWork(nextPage)
        .then((val) => {
          newArr = [...newArr, ...val.data.messages]
          nextPage = val.data.nextPageToken || null
        })
        .catch((err) => {
          console.log('Promise fail')
          loopContinue = false
          console.error(err)
        })
    }

    let headersArray = []

    await asyncForEach(newArr, async (msg) => {
      let resp = await gmail.users.messages.get({
        userId: userId,
        id: msg.id,
        format: 'metadata',
        metadataHeaders: ['Subject', 'From', 'To', 'Date'],
      })
      let obj = {
        id: msg.id,
      }
      resp.data.payload.headers.forEach((el) => {
        obj[el.name] = el.value
      })
      headersArray.push(obj)
    })

    return headersArray
  }
  if (initialRequest.data.resultSizeEstimate > 0) {
    newArr = [...newArr, ...initialRequest.data.messages]
    return Managework()
  } else {
    return []
  }

  function doWork(tkn) {
    return new Promise((resolve, reject) => {
      if (tkn) {
        let request = gmail.users.messages.list({
          userId: userId,
          pageToken: tkn,
          q: query,
        })
        resolve(request)
      } else {
        reject('no more pages')
      }
    })
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
}

/**
 * Get Message with given ID.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} messageId ID of Message to get.
 * @param  {Function} callback Function to call when the request is complete.
 */
async function getMessage(messageId) {
  const userId = 'me'

  //const gmail = await google.gmail({version: 'v1', auth})

  var response = await gmail.users.messages.get({
    userId: userId,
    id: messageId,
  })

  var parts = response.data.payload.parts || []
  //let decoded = await parseMessage(response.data.payload.body).textPlain
  let decoded = await parseMessage(response.data)

  decoded = decoded.textHtml || decoded.textPlain

  let attachmentsArray = []

  if (parts.length > 0) {
    await asyncForEach(parts, async (part) => {
      let obj = {}
      if (part.filename && part.filename.length > 0) {
        var attachId = part.body.attachmentId
        var request = await gmail.users.messages.attachments.get({
          id: attachId,
          messageId: messageId,
          userId: userId,
        })

        obj.filename = part.filename
        obj.attachment = request.data.data
        obj.type = part.mimeType
        attachmentsArray.push(obj)
      }
    })
  }

  if (!decoded) {
    return console.log('The API returned an error inside single message fetch')
  } else {
    return decoded
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
}

async function createDraft(msg) {
  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const subject = `SERVICE QUOTE REQUEST FOR CARRECTLY - ${msg.orderid}`
  //const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`
  const messageParts = [
    'From: <info@carrectly.com>',
    `To: ${msg.email}`,
    'Cc: <info@carrectly.com>',
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    'Hello,<br/>',
    'Your business has been selected to service a vehicle for Carrectly <br/>',
    'Our concierge will drop off the car shortly.',
    '<b>PLEASE REPLY TO THIS EMAIL</b> once you have a quote estimate for the vehicle below:<br/>',
    `Car Make: ${msg.make}<br/>`,
    `Car Model: ${msg.model}<br/>`,
    `Car Year: ${msg.year}<br/>`,
    `VIN: ${msg.vin}<br/>`,
    'Thank you for your business,<br/>',
    'TEAM CARRECTLY',
  ]
  const message = messageParts.join('\n')

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  //.replace(/=+$/, '')

  //function to send the message
  // const res = await gmail.users.messages.send({
  // 	userId: 'me',
  // 	requestBody: {
  // 		raw: encodedMessage,
  // 	},
  // })

  // create a draft
  const res = await gmail.users.drafts.create({
    userId: 'me',
    resource: {
      message: {
        raw: encodedMessage,
      },
    },
  })

  return res.data
}

async function sendEmailConfirmation(msg) {
  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const subject = `Thank you for requesting your auto service - Carrectly Auto Care - ${msg.orderid}`
  //const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`
  const messageParts = [
    'From: <info@carrectly.com>',
    'Cc: <info@carrectly.com>',
    `To: ${msg.email}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    `Hello ${msg.customerName}
Thank you for requesting your car maintenance with Carrectly.

We have received your order with the following details:
${msg.make} ${msg.model} ${msg.year}
Pick up date:  ${msg.pickupDate}
Drop off date: ${msg.dropoffDate}

Please allow us to answer some most common questions, plan & coordinate everything.Here is what you should expect:

PICK - UP & RETURN

- All of our services include free concierge vehicle pick - up and return in most parts of Chicago.If we don't currently serve your area, we will let you know.
- Our customer service will send you a message from our 773 - 800 - 9085 number to confirm the appointment and coordinate the pick - up.Expect the text either on the evening before or the morning of the scheduled service.Feel free to text or call us for an update as well.

PRICES & SERVICES

- We do all types of auto services(Detailing, Mechanical Repairs, Body Work, Paint Protection Films and Tints, Upholstery, etc) so depending on what you are looking for, the process and prices may vary.
- DETAILING: the price you see on the website is what you pay.Any requested additional work, tough stains, or excessive pet hair may be extra - we will always give you heads up, explain the process, and ask for your approval.
Remember, there will always be some moisture trapped inside of the cabin for a day or two after interior detailing - no matter how much we dry it.So try to run your air on high when you drive it, don’t put your mats back until carpets breathe a little, and try cracking your windows open if you can - all to air out the car as much as possible and avoid any funky smell.
- REPAIRS: the prices on small common repairs are pre - fixed and are listed on the website - parts, labor, logistics, all fees and even sales tax is already included.Many other repairs require initial diagnostics to determine the problem and estimate the price correctly.
- FREE ONLINE QUOTES: We can put together any estimate for you - just tell us what work needs to be done.For auto body repair please email us the photos of the damage + VIN to info@carrectly.com and we’ll work on a quote.

COMMUNICATION, TIME & SCHEDULING

- We try to work around your schedule and availability as much as possible.However, due to unpredictability of some auto services we do ask you for some wiggle room on both pick - up and completion times.
- Most work starts shortly after we have your car in our facilities, but it’s suggested to schedule more time - consuming services for the earlier part of the day.Major repairs and detailing cannot be done on Sundays.
- Our team can always provide you with updates on appointment times, estimates, and expected completion - just send us a text.

KEYS & PAYMENT

- You can meet our concierges in person during the pick - up or return, but you don’t have to.Many people now leave us keys with someone, with parking attendants, in lockboxes, or with their home / office front desks.Instruction on where to get the key and where the car is located is all we need - we'll do the rest.
- Yes, we take current COVID19 pandemic very seriously: all our staff and concierges are wearing PPE and we disinfect your vehicle upon delivery.
- We’ll send you an invoice to your email once your car is returned, and you can pay online with any credit card upon receipt.

That is all. Let us know if you have any questions and we will help with anything we can!
Thank you!

- Carrectly Team`,
  ]
  const message = messageParts.join('\n')

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  })

  return res.data
}
