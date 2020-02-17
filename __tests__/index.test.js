const dpkgStatusExporter = require('../')

jest.mock('fs')
jest.mock('os')

const os = require('os')

describe('dpkg-status-exporter', () => {
  it('successfully exports the HTML index', () => {
    os.__setPlatformOverride('linux')
    expect(dpkgStatusExporter()).toBeUndefined()
  })
})
