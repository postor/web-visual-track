const { exists, emptyDir, ensureDir, copyFile, writeJSON, writeFile } = require('fs-extra')
const { join } = require('path')
const { builtin } = require('./presets')

const buildinPreset = {
  name: 'buildin',
  list: [
    {
      name: 'buildin',
      fn: `async (page, href, gotoOptions) => await page.goto(href, gotoOptions)`
    },
  ]
}

module.exports = async (options) => {
  const { url, urls, presets = [buildinPreset] } = options
  process.send && process.send('generateing test file')
  const folderName = require('./url2folder')(url)
  const folderPath = join(__dirname, '..', '..', 'tests', folderName)
  const folderExists = exists(folderPath)
  if (folderExists) {
    await emptyDir(folderPath)
  }
  await ensureDir(folderPath)
  await copyFile(join(__dirname, 'template.js'), join(folderPath, `${folderName}.test.js`))
  const presetsFolder = join(folderPath, 'presets')
  generatePresets(presets, presetsFolder)
  const siteconfig = {
    url, urls, presets,
    generated: true,
  }
  await writeJSON(join(folderPath, 'config.json'), siteconfig)
  process.send && process.send(`test generated at ${folderPath}`)
  return siteconfig
}

async function generatePresets(presets, presetsFolder) {
  try {
    await ensureDir(presetsFolder)
    await Promise.all(presets.map(async (preset) => {
      const { name, list = [] } = preset
      const str = `module.exports.name = '${name}';module.exports.list = [${list.map((x) => {
        const { name, fn } = x
        return `{
          name:'${name}',
          fn:${fn},
        }`
      })}];`
      await writeFile(join(presetsFolder, `${name}.js`), str)
    }))
  } catch (e) {
    console.log(e)
  }
}