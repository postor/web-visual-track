const { exists, emptyDir, ensureDir, copyFile, writeJSON } = require('fs-extra')
const { join } = require('path')

module.exports = async (baseUrl, urls) => {
  process.send && process.send('generateing test file')
  const folderName = require('./url2folder')(baseUrl)
  const folderPath = join(__dirname, '..', '..', 'tests', folderName)
  const folderExists = exists(folderPath)
  if (folderExists) {
    await emptyDir(folderPath)
  }
  await ensureDir(folderPath)
  await copyFile(join(__dirname, 'template.js'), join(folderPath, `${folderName}.test.js`))
  await writeJSON(join(folderPath, 'config.json'), {
    baseUrl,
    urls,
  })
  process.send && process.send(`test generated at ${folderPath}`)
}