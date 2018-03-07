const args = require('args')
const fs = require('fs-extra')
args.option('url', 'The base url to test', '')

const flags = args.parse(process.argv);

(async () => {
  console.log(flags)
  if (flags.url) {
    const baseUrl = flags.url
    const crawlAll = await require('./lib/crawl')(baseUrl)
    const urls = await crawlAll(baseUrl)
    await require('./lib/generate')(baseUrl, urls)
    await require('./lib/jest')(baseUrl, true)
    process.send && process.send({ result: urls })
  }
})()