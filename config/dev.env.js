'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_BASE_URL: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
  API_BASE_URL: '"/api"'
})
