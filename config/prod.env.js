'use strict'
require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  APIPATH: process.env.APIPATH,
  CUSTOMPATH: process.env.CUSTOMPATH,
}
