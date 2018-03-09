const fs = require('fs-extra')
const { join } = require('path')
const url2folder = require('../cmds/lib/url2folder')


module.exports = async (req, res) => {
  const { baseUrl } = req.query
  const generated = await getImageList(getGeneratedPath(baseUrl), getGeneratedUrl(baseUrl))
  const diff = await getImageList(getDiffPath(baseUrl), getDiffUrl(baseUrl))
  res.json({
    generated,
    diff,
  })
}

function getGeneratedPath(baseUrl) {
  return join(__dirname, '..', 'tests', url2folder(baseUrl), '__image_snapshots__')
}

function getDiffPath(baseUrl) {
  return join(getGeneratedPath(baseUrl), '__differencified_output__')
}

function getGeneratedUrl(baseUrl) {
  return `/${url2folder(baseUrl)}/__image_snapshots__`
}

function getDiffUrl(baseUrl) {
  return `/${url2folder(baseUrl)}/__image_snapshots__/__differencified_output__`
}

async function getImageList(path, baseUrl) {
  const exists = await fs.pathExists(path)
  if (!exists) {
    return []
  }
  const fileNames = await fs.readdir(path)
  const isFileFlags = await Promise.all(fileNames.map(async (x) => {
    const stat = await fs.lstat(join(path, x))
    return stat.isFile()
  }))

  return fileNames.filter((x, i) => isFileFlags[i]).map(x => `${baseUrl}/${x}`)
}