const { fork } = require('child_process')
const { join } = require('path')
const { actions } = require('../cmds/index')

module.exports = (io, db) => {
  io.on('connection', (socket) => {
    socket.on('siteaction', (params) => {
      const { url, action } = params
      const { cmd } = actions[action]
      const childProcess = fork(`cmds/${cmd}`, [`--url=${url}`], { maxBuffer: 1024 * 1024 })
      childProcess.on('message', (msg) => socket.emit('siteactionlog', msg))
    })
  })
}