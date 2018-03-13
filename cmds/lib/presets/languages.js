const browserLangs = [
  {
    evaluate: () => {
      Object.defineProperty(navigator, "languages", {
        get: function () {
          return ["en-US", "en", "bn"]
        }
      })
      Object.defineProperty(navigator, "language", {
        get: function () {
          return "en-US"
        }
      })
    },
    lang: 'en',
    headers: {
      'accept-language': 'en-US,en;q=0.8'
    },
  }, {
    evaluate: () => {
      Object.defineProperty(navigator, "languages", {
        get: function () {
          return ["zh-CN", "zh", "en", "zh-TW"]
        }
      })
      Object.defineProperty(navigator, "language", {
        get: function () {
          return "zh-CN"
        }
      })
    },
    lang: 'zh',
    headers: {
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7'
    },
  },
]

module.exports = {
  name: 'language',
  list: browserLangs.map((x) => {
    return {
      name: x.lang,
      fn: async (page, href, gotoOptions) => {
        await page.evaluateOnNewDocument(x.evaluate)
        await page.setExtraHTTPHeaders(x.headers)
      }
    }
  })
}