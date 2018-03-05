const { join, dirname } = require('path')
const { static } = require('express')
console.log(require.resolve('materialize-css'))
module.exports = [
  static(join(__dirname, '..', 'static')),
  static(join(dirname(require.resolve('materialize-css')), '..')),
]