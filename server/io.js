const { actions } = require('../cmds/index')

module.exports = (io, db) => {
  io.on('connection', (socket) => {
    socket.on('siteaction', (params) => {
      const { url, action } = params
      const { cmd } = actions[action]

    })
  })
}