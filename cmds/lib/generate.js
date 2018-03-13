const { exists, emptyDir, ensureDir, copyFile, writeJSON, writeFile, copy } = require('fs-extra')
const { join } = require('path')

module.exports = async (options) => {
  const { url, urls, presets = [{ name: 'devices' }] } = options
  process.send && process.send('generateing test file')
  const folderName = require('./url2folder')(url)
  const folderPath = join(__dirname, '..', '..', 'tests', folderName)
  const folderExists = exists(folderPath)
  if (folderExists) {
    await emptyDir(folderPath)
  }
  await ensureDir(folderPath)
  await copyFile(join(__dirname, 'template.js'), join(folderPath, `${folderName}.test.js`))
  await copy(join(__dirname, 'presets'), join(folderPath, 'presets'))

  const siteconfig = { url, urls, presets }
  await writeJSON(join(folderPath, 'config.json'), siteconfig)
  process.send && process.send(`test generated at ${folderPath}`)
  return siteconfig
}