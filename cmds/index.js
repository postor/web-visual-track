const { join } = require('path')
const { SITE_LIST_KEY } = require('../components/sitelist/define')

module.exports.actions = {
  crawl: {
    title: 'Crawl',
    cmd: 'crawl.js',
    click: (param) => {
      const { set, index, io, comp, url } = param
      comp.setState({ loading: true })
      io.emit('siteaction', { url, action: 'crawl' })
      io.on('siteactionlog', (data) => {
        if (data.result) {
          comp.setState({ loading: false })
          set(`${SITE_LIST_KEY}.${index}.urls`, data.result)
        }
        set(`${SITE_LIST_KEY}.${index}.logs`, { data, date: new Date() }, 'unshift')
        set(`${SITE_LIST_KEY}.${index}.logs`, [10, 5], 'splice')
      })
    },
  },
  track: {
    title: 'Track Now',
    cmd: `track.js`,
    click: (param) => {
      const { set, index, io, comp, url } = param
      comp.setState({ loading: true })
      io.emit({ url, action: 'track' })
      io.on('siteactionlog', (data) => {
        if (data.result) {
          comp.setState({ loading: false })
          set(`${SITE_LIST_KEY}.${index}.pass`, data.result == 0)
        }
        set(`${SITE_LIST_KEY}.${index}.logs`, data, 'unshift')
      })
    },
  },
}

module.exports.getOptions = (site) => {
  const { urls = [], testGenerated, imagesGenerated, lastTest } = site
  let opts = []

  opts.push('crawl')
  if (!urls.length) {
    return opts
  }

  opts.push('track')
  return opts
}
