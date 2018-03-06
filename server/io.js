
module.exports = (io, db) => {
  io.on('connection', (socket) => {
    socket.on('siteaction', (params) => {
      const { url, action } = params


    })
  })
}