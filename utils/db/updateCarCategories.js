const fs = require('fs')

// this script will be used once a year to update the database classifications
// for extra large cars
// original db location https://www.back4app.com/
const run = (file) => {
  const XLcarsArray = [
    'Q9',
    'Q7',
    'Tahoe',
    'Escalade',
    'Suburban',
    'Expedition MAX',
    'Expedition',
    'GV80',
    'Yukon XL',
    'Yukon',
    'Palisade',
    'QX80',
    'Grand Wagoneer',
    'Telluride',
    'LX',
    'GX',
    'Aviator',
    'Navigator',
    'Range Rover',
    'Defender 90',
    'Defender 110',
    'Mercedes-AMG G-Class',
    'G-Class',
    'GL-Class',
    'GLS',
    'Mercedes-AMG GLS',
    'Pathfinder Armada',
    'Armada',
    'Pathfinder',
    'Model X',
    'Land Cruiser',
    'Sequoia',
    'X7',
    'XC90',
    'Atlas',
  ]

  try {
    const newFile = file.map((singleRow) => {
      if (XLcarsArray.includes(singleRow.Model)) {
        singleRow.Category = 'XL'
      }
      return singleRow
    })

    fs.writeFileSync('carMakesListWithXL.json', JSON.stringify(newFile))
  } catch (error) {
    console.log('problem', error)
  }
}

const list = fs.readFileSync('carMakesList.json')
run(JSON.parse(list))

module.exports = run
