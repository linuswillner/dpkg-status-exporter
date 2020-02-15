const fs = require('fs')
const path = require('path')
const util = require('util')
const debCtrlToJson = require('../src/debian-control-to-json')

const readFile = util.promisify(fs.readFile)

module.exports = async () => {
  const mockStatus = await readFile(path.join(__dirname, 'status.real'), { encoding: 'utf-8' })
  return debCtrlToJson(mockStatus)
}
