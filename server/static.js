const { join, dirname } = require('path')
const { static } = require('express')

module.exports = [
  static(join(__dirname, '..', 'static')),
  static(join(dirname(require.resolve('materialize-css')), '..')),
  static(join(__dirname, '..', 'node_modules', 'font-awesome')),
]