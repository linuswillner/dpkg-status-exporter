const fs = require('fs')
const util = require('util')
const os = require('os')

const readFile = util.promisify(fs.readFile)

module.exports = async statusFile => {
  if (!fs.existsSync(statusFile)) {
    let error = 'Could not find /var/lib/dpkg/status. '

    throw new Error(os.platform() === 'win32'
      ? error += 'This operating system does not appear to be a *nix system.'
      : error += 'The operating system may be using a package manager other than Aptitude, or the file may be missing/corrupted.'
    )
  }

  return readFile(statusFile, { encoding: 'utf-8' })
}
