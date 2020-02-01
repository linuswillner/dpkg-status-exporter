const fs = require('fs')
const util = require('util')
const os = require('os')

// Promisify fs.readFile
const readFile = util.promisify(fs.readFile)

module.exports = async () => {
  try {
    return readFile('/var/lib/dpkg/status', 'utf-8')
  } catch (err) {
    console.error('ERROR: Could not read /var/lib/dpkg/status:', err)
    console.error(os.platform() === 'win32' ? 'This operating system does not appear to be a Linux system.' : 'Please check your operating system installation.')
  }
}
