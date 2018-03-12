const args = require('args')
const fs = require('fs-extra')
args.option('url', 'The base url to test', '')

const flags = args.parse(process.argv);

(async () => {
  if (flags.url) {
    const baseUrl = flags.url
    try {
      const crawlAll = await require('./lib/crawl')(baseUrl)
      const urls = await crawlAll(baseUrl)
      const siteConfig = await require('./lib/generate')({ url: baseUrl, urls })
      await require('./lib/jest')(baseUrl, true)
      process.send && process.send({ result: siteConfig })
    } catch (e) {
      console.log(e)
    }
  }
})()