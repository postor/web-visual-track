const { fork } = require('child_process')
const { join } = require('path')
const url2folder = require('./url2folder')

module.exports = (url, update = false) => {

  process.send && process.send('starting jest, this may take a long time, depends on total count of url and network status')
  const cliPath = `node_modules/jest-cli/bin/jest.js`

  const folderName = url2folder(url)
  let args = [`--testPathPattern=${folderName}.test.js`]
  if (update) args.push('--updateSnapshot')

  var env = Object.create(process.env)
  env.NODE_ENV = 'test'

  const childProcess = fork(cliPath, args, { silent: true, env })
  childProcess.stdout.setEncoding('utf8')

  const cb = (data) => {
    process.send && process.send(data.toString ? data.toString() : data)
  }

  childProcess.stdout.on('data', cb)
  childProcess.stderr.on('data', cb)

  return new Promise((resolve) => {
    childProcess.on('close', (code) => {
      process.send && process.send('jest finished')
      resolve(code)
    })
  })
}