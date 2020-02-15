const fs = require('fs')
const util = require('util')
const os = require('os')

// Promisify fs.readFile
const readFile = util.promisify(fs.readFile)

module.exports = async () => {
  if (!fs.existsSync('/var/lib/dpkg/status')) {
    throw new Error(os.platform() === 'win32'
      ? 'This operating system does not appear to be a *nix system.'
      : 'The operating system may be using a package manager other than Aptitude, or the file may be missing/corrupted.'
    )
  }

  return readFile('/var/lib/dpkg/status', 'utf-8')
}
