const fs = require('fs')
const util = require('util')
const os = require('os')

const readFile = util.promisify(fs.readFile)

module.exports = async statusFile => {
  if (!fs.existsSync(statusFile)) {
    throw new Error(os.platform() === 'win32'
      ? 'This operating system does not appear to be a *nix system.'
      : 'The operating system may be using a package manager other than Aptitude, or the file may be missing/corrupted.'
    )
  }

  return readFile(statusFile, { encoding: 'utf-8' })
}
