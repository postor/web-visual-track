const { join } = require('path')

module.exports.actions = {
  crawl: {
    title: 'Crawl',
    cmd: join(__dirname, 'lib', `crawl.js`),
  },
  trackNow: {
    title: 'Track Now',
    cmd: join(__dirname, 'lib', `track.js`),
  },
}

module.exports.getOptions = (site) => {
  const { urls = [], testGenerated, imagesGenerated, lastTest } = site
  let opts = []

  if (!urls.length) {
    opts.push('crawl')
    return opts
  }

  opts.push('trackNow')
}