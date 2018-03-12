module.exports = (url) => {
  if (typeof url == 'string') {
    return url.replace(/\W/g, '')
  }
  url.href.replace(/\W/g, '')
}