const exportDpkgStatus = require('../src')

jest.mock('fs')
jest.mock('os')

const fs = require('fs')
const os = require('os')

describe('dpkg-status-exporter', () => {
  it('throws an error if something went wrong during the export', async () => {
    os.__setPlatformOverride('linux')
    fs.__setExistsSyncOverride(true)
    fs.__setWriteFileError(new Error('could not write file'))
    await expect(exportDpkgStatus()).rejects.toThrowError(/could not write file/gi)
  })
})
