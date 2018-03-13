const devicesPreset = require('puppeteer/DeviceDescriptors')

const iPhone = devicesPreset['iPhone 6']
const iPad = devicesPreset['iPad']

const devices = [
  {
    name: 'iphone',
    emulate: iPhone
  },
  {
    name: 'iPad',
    emulate: iPad,
  },
  {
    name: 'pc',
    emulate: {
      viewport: {
        width: 1920,
        height: 1080,
      },
      userAgent: "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
    }
  },
]

module.exports = {
  name: 'devices',
  list: devices.map((x) => {
    return {
      name: x.name,
      fn: async (page, href, gotoOptions) => await page.emulate(x.emulate)
    }
  })
}