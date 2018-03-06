const puppeteer = require('puppeteer');
const getCrawlAll = (async () => {
  const dic = {}
  // Init Pupeteer
  const executablePath = `C:\\Users\\josh\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe`
  const browser = await puppeteer.launch({
    headless: false,
    executablePath,
  })
  const page = await browser.newPage() // New Page to be manipulated

  return async (baseUrl) => {
    dic[baseUrl] = false
    while (!Object.keys(dic).every(x => dic[x])) {
      await crawlOne()
    }
    // Close Browser
    await browser.close();

    return Object.keys(dic)

    async function crawlOne() {
      const url = Object.keys(dic).find(x => !dic[x])
      dic[url] = true
      process.send && process.send(`crawling url ${url}...`)
      // Automation
      await page.goto(url)
      let links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a')).map((val) => val.href)
      });

      links.forEach(x => {
        const y = (x.split('#')[0]) //remove after #
        const z = y.endsWith('/') ? y.substring(0, y.length - 1) : y //trim right `/`
        if (z.startsWith(baseUrl) && !dic[z]) {
          if (typeof dic[z] == 'undefined') {
            process.send && process.send(`found url ${z}`)
          }
          dic[z] = false
        }
      })
    }
  }
})


module.exports = getCrawlAll
