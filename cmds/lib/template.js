
const Differencify = require('differencify').default
const { presets, urls } = require('./config')
const url2folder = require('../../cmds/lib/url2folder')

let launchConfig = {}
if (require('fs').existsSync(require('path').join(__dirname, '..', '..', 'launch.json'))) {
  launchConfig = require('../../launch')
}

let browsers = []
const cases = plaintify('', [], presets)

describe('t', () => {
  cases.forEach((casei) => {
    const { key, fnarr } = casei
    urls.forEach(async (url) => {
      let { href, gotoOptions = {}, enabled = true } = typeof url === 'string' ? { href: url } : url
      const testName = `${key}${url2folder(href)}`

      enabled && it(testName, async () => {
        const differencify = new Differencify()
        const target = differencify.init({ testName, chain: false });
        const browser = await target.launch(launchConfig)
        browsers.push(browser)
        const page = await browser.newPage()
        for (let i = 0; i < fnarr.length; i++) {
          await fnarr[i](page, href, gotoOptions)
        }
        await page.goto(href, gotoOptions)
        const image = await page.screenshot({ fullPage: true })
        const result = await target.toMatchSnapshot(image)
        expect(result).toBe(true)
        await page.close()
        await browser.close()
        await differencify.cleanup()
      }, 60000)
    })
  })
})

afterAll(() => {
  browsers.forEach((browser) => browser.close())
})


function plaintify(key, fnarr, presets) {
  if (presets.length <= 0) {
    return [{ key, fnarr }]
  }
  const cur = presets[0]
  const curModule = require(`./presets/${cur.name}`)
  const next = presets.concat().slice(1)
  const { name, list } = curModule
  const arr = list.map((it) => {
    return plaintify(`${key}-${name}${it.name}-`, fnarr.concat([it.fn]), next)
  })

  return arr.reduce((p, n) => p.concat(n))
}