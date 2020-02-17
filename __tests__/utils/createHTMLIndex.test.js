const createHTMLIndex = require('../../src/utils/createHTMLIndex')

jest.mock('fs')

const fs = require('fs')

describe('createHTMLIndex utility', () => {
  it('throws an error if the file could not be written', async () => {
    fs.__setWriteFileError(new Error('could not write file'))
    fs.__setExistsSyncOverride(true)
    await expect(createHTMLIndex([])).rejects.toThrowError(/could not write file/gi)
  })

  it('throws an error if the directory could not be created', async () => {
    fs.__setMkdirError(new Error('could not create directory'))
    fs.__setExistsSyncOverride(false)
    await expect(createHTMLIndex([])).rejects.toThrowError(/could not create directory/gi)
  })
})
