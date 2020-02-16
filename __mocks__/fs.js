const fs = jest.genMockFromModule('fs')

const mockFile = 'this is a UTF-8 encoded string'
let existsSyncOverride

/**
 * Override the return value of fs.existsSync().
 * @param {Boolean} valueToReturn Boolean value to always return on fs.existsSync().
 */
function __setExistsSyncOverride (valueToReturn) {
  existsSyncOverride = valueToReturn
}

function readFile (path, options, callback) {
  callback(undefined, mockFile)
}

function existsSync (path) {
  return existsSyncOverride
}

fs.__setExistsSyncOverride = __setExistsSyncOverride
fs.readFile = readFile
fs.existsSync = existsSync

module.exports = fs
