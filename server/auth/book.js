const router = require('express').Router();
var parseMessage = require('gmail-api-parse-message');
const { gmail, corporateGmail } = require('./oAuth2Client');

module.exports = router;

router.get('/:orderid', async (req, res, next) => {
  try {
    const id = req.params.orderid;
    let result = await listMessages(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/single/:messageid', async (req, res, next) => {
  try {
    const id = req.params.messageid;
    let result = await getMessage(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/createdraft', async (req, res, next) => {
  try {
    const obj = req.body;
    let result = await createDraft(obj);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/sendconfirmation', async (req, res, next) => {
  try {
    const obj = req.body;
    console.log('reqest to send an email', req.body);
    let result = await sendEmailConfirmation(obj);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

async function listMessages(id) {
  const userId = 'me';
  const query = `subject:${id}`;
  var initialRequest = await corporateGmail().users.messages.list({
    userId: userId,
    q: query,
  });

  let nextPage = initialRequest.data.nextPageToken;

  var loopContinue = true;
  let newArr = [];
  async function Managework() {
    while (loopContinue) {
      await doWork(nextPage)
        .then((val) => {
          newArr = [...newArr, ...val.data.messages];
          nextPage = val.data.nextPageToken || null;
        })
        .catch((err) => {
          console.log('Promise fail');
          loopContinue = false;
          console.error(err);
        });
    }

    let headersArray = [];

    await asyncForEach(newArr, async (msg) => {
      let resp = await corporateGmail().users.messages.get({
        userId: userId,
        id: msg.id,
        format: 'metadata',
        metadataHeaders: ['Subject', 'From', 'To', 'Date'],
      });
      let obj = {
        id: msg.id,
      };
      resp.data.payload.headers.forEach((el) => {
        obj[el.name] = el.value;
      });
      headersArray.push(obj);
    });

    return headersArray;
  }
  if (initialRequest.data.resultSizeEstimate > 0) {
    newArr = [...newArr, ...initialRequest.data.messages];
    return Managework();
  } else {
    return [];
  }

  function doWork(tkn) {
    return new Promise((resolve, reject) => {
      if (tkn) {
        let request = corporateGmail().users.messages.list({
          userId: userId,
          pageToken: tkn,
          q: query,
        });
        resolve(request);
      } else {
        reject('no more pages');
      }
    });
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
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
  const userId = 'me';

  //const gmail = await google.gmail({version: 'v1', auth})

  var response = await corporateGmail().users.messages.get({
    userId: userId,
    id: messageId,
  });

  var parts = response.data.payload.parts || [];
  //let decoded = await parseMessage(response.data.payload.body).textPlain
  let decoded = await parseMessage(response.data);

  decoded = decoded.textHtml || decoded.textPlain;

  let attachmentsArray = [];

  if (parts.length > 0) {
    await asyncForEach(parts, async (part) => {
      let obj = {};
      if (part.filename && part.filename.length > 0) {
        var attachId = part.body.attachmentId;
        var request = await gmail().users.messages.attachments.get({
          id: attachId,
          messageId: messageId,
          userId: userId,
        });

        obj.filename = part.filename;
        obj.attachment = request.data.data;
        obj.type = part.mimeType;
        attachmentsArray.push(obj);
      }
    });
  }

  if (!decoded) {
    return console.log('The API returned an error inside single message fetch');
  } else {
    return decoded;
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

async function createDraft(msg) {
  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const subject = `SERVICE QUOTE REQUEST FOR CARRECTLY - ${msg.orderid}`;
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
  ];
  const message = messageParts.join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  //.replace(/=+$/, '')

  //function to send the message
  // const res = await gmail().users.messages.send({
  // 	userId: 'me',
  // 	requestBody: {
  // 		raw: encodedMessage,
  // 	},
  // })

  // create a draft
  const res = await corporateGmail().users.drafts.create({
    userId: 'me',
    resource: {
      message: {
        raw: encodedMessage,
      },
    },
  });

  return res.data;
}
