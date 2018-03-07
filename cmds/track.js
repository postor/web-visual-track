const args = require('args')
const fs = require('fs-extra')
args.option('url', 'The base url to test', '')

const flags = args.parse(process.argv);

(async () => {
  if (flags.url) {
    const returnCode = await require('./lib/jest')(flags.url)
    process.send && process.send({ result: returnCode })
  }
})()