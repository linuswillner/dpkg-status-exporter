const path = require('path')
const fs = jest.genMockFromModule('fs')

// Mock file contents to skirt around having to hit the FS
const mockFiles = {
  '/var/lib/dpkg/status': require('../__test-utils__/dpkgStatusSample').raw,
  [path.join(process.cwd(), 'src/pages/template.html')]: '[packageList]'
}

const overrides = {}

// Override the return value of fs.existsSync()
function __setExistsSyncOverride (valueToReturn) {
  overrides.existsSync = valueToReturn
}

// Sets an error to appear on fs.writeFile()
function __setWriteFileError (error) {
  overrides.writeFile = error
}

// Sets an error to appear on fs.mkdir()
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
