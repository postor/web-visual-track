
const Differencify = require('differencify').default
const { baseUrl, urls } = require('./config')
const url2folder = require('../../cmds/lib/url2folder')

let launchConfig = {}
if(require('fs').existsSync(require('path').join(__dirname,'..','..','launch.json'))){
  launchConfig = require('../../launch')
}

let browsers = []

describe('url-', () => {
  urls.forEach(async (url, i) => {
    const testName = url2folder(url)
    it(testName, async () => {
      const differencify = new Differencify()
      const target = differencify.init({ testName, chain: false });
      const browser = await target.launch(launchConfig)
      browsers.push(browser)
      const page = await browser.newPage()
      await page.goto(url)
      const image = await page.screenshot({ fullPage: true })
      const result = await target.toMatchSnapshot(image)
      expect(result).toBe(true)
      await page.close()
      await browser.close()
      await differencify.cleanup()
    }, 60000)
  })
})

afterAll(() =>{
  browsers.forEach((browser)=>browser.close())  
})