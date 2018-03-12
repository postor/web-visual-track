const { join } = require('path')
const { writeJSON } = require('fs-extra')
const { Router } = require('express')
const bodyParser = require('body-parser')
const url2folder = require('../cmds/lib/url2folder')

const route = new Router()

route.use(bodyParser.json())

route.post('/', (req, res) => {
  const site = req.body
  const p = join(__dirname, '..', 'tests', url2folder(site.url), 'config.json')
  writeJSON(p, site).then(() => {
    res.send({ error: 0 })
  }).catch((error) => {
    res.send({ error })
  })
})

module.exports = route