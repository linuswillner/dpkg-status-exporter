const path = require('path')
const fs = jest.genMockFromModule('fs')

const mockFiles = {
  '/var/lib/dpkg/status': require('../__test-utils__/dpkgStatusSample').raw,
  [path.join(process.cwd(), 'src/pages/template.html')]: '[packageList]'
}

const overrides = {}

// Functions to alter return values for various FS functions

function __setExistsSyncOverride (valueToReturn) {
  overrides.existsSync = valueToReturn
}

function __setWriteFileError (error) {
  overrides.writeFile = error
}

function __setMkdirError (error) {
  overrides.mkdir = error
}

// Mocks for various FS functions

function readFile (path, options, callback) {
  callback(undefined, mockFiles[path])
}

function writeFile (path, data, callback) {
  callback(overrides.writeFile)
}

function existsSync (path) {
  return overrides.existsSync
}

function mkdir (path, callback) {
  callback(overrides.mkdir)
}

fs.__setExistsSyncOverride = __setExistsSyncOverride
fs.__setWriteFileError = __setWriteFileError
fs.__setMkdirError = __setMkdirError

fs.readFile = readFile
fs.writeFile = writeFile
fs.existsSync = existsSync
fs.mkdir = mkdir

module.exports = fs
