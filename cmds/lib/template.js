
const Differencify = require('differencify').default
const { baseUrl, urls } = require('./config')
const url2folder = require('../../cmds/lib/url2folder')

describe('url-', () => {
  urls.forEach(async (url, i) => {
    const testName = url2folder(url)
    it(testName, async () => {
      const executablePath = `C:\\Users\\josh\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe`
      const differencify = new Differencify()
      const target = differencify.init({ testName, chain: false });
      const browser = await target.launch({
        executablePath, //if you use chrome or chrome canary
        //headless : false,
      })
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
