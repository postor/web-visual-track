require('babel-polyfill')
const Server = require('http').Server
const express = require('express')
const next = require('next')
const rtdb = require('node-realtime-db-server')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    const http = Server(server)
    const { db } = rtdb.default(http, {}, {
      Adapter: rtdb.JsonFileAdapter,
    })
    
    server.use(require('./static'))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    http.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })