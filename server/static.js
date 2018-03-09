const { join, dirname } = require('path')
const { static } = require('express')
console.log(require.resolve('jquery'))
module.exports = [
  static(join(__dirname, '..', 'static')),
  static(join(dirname(require.resolve('materialize-css')), '..')),
  static(dirname(require.resolve('jquery'))),
  static(join(__dirname, '..', 'node_modules', 'font-awesome')),
  static(join(__dirname, '..', 'tests')),
]