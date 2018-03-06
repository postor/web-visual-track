module.exports.actions = {
  crawl: {
    title: 'Crawl',
    cmd: `crawl.js`,
  },
  generateTest: {
    title: 'Generate Tests',
    cmd: `generate-test.js`,
  },
  regenerateTest: {
    title: 'Regenerate Tests',
    cmd: `generate-test.js`,
  },
  generateImage: {
    title: 'Generate Images',
    cmd: `generate-image.js`,
  },
  regenerateImage: {
    title: 'Regenerate Images',
    cmd: `generate-image.js`,
  },
  trackNow: {
    title: 'Track Now',
    cmd: `track.js`,
  },
}

module.exports.getOptions = (site) => {
  const { urls = [], testGenerated, imagesGenerated, lastTest } = site
  let opts = []

  if (!urls.length) {
    opts.push('crawl')
    return opts
  }

  opts.push(testGenerated ? 'regenerateTest' : 'generateTest')
  if (!testGenerated) {
    return opts
  }

  opts.push(imagesGenerated ? 'regenerateImage' : 'generateImage')
  if (!imagesGenerated) {
    return opts
  }

  opts.push('trackNow')
}