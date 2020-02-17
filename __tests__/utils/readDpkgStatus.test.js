const readDpkgStatus = require('../../src/utils/readDpkgStatus')

jest.mock('fs')
jest.mock('os')

const fs = require('fs')
const os = require('os')

describe('readDpkgStatus utility', () => {
  it('throws an unsupported OS error on Windows', async () => {
    os.__setPlatformOverride('win32')
    fs.__setExistsSyncOverride(false)

    await expect(readDpkgStatus('/var/lib/dpkg/status/')).rejects
      .toThrowError('This operating system does not appear to be a *nix system.')
  })

  it('throws an unsupported package manager or file corruption error on Linux', async () => {
    os.__setPlatformOverride('linux')
    fs.__setExistsSyncOverride(false)

    await expect(readDpkgStatus('/var/lib/dpkg/status/')).rejects
      .toThrowError('The operating system may be using a package manager other than Aptitude, or the file may be missing/corrupted.')
  })

  it('reads /var/lib/dpkg/status and returns a string', async () => {
    fs.__setExistsSyncOverride(true)
    expect(await readDpkgStatus('/var/lib/dpkg/status')).toBeType('string')
  })
})
