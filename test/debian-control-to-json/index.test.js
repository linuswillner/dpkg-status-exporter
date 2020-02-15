const fs = require('fs')
const path = require('path')
const debCtrlToJson = require('../../src/debian-control-to-json')

const mockStatus = fs.readFileSync(path.join(__dirname, '../status.real'), { encoding: 'utf-8' })
let packageIndex

beforeAll(async () => {
  packageIndex = await debCtrlToJson(mockStatus)
})

describe('debian-control-to-json', () => {
  it('returns an object', () => {
    expect(packageIndex).toBeType('object')
  })

  it('contains all packages (700)', () => {
    expect(Object.keys(packageIndex)).toHaveLength(700)
  })

  it('serialises each package into an object', () => {
    for (const pkg in packageIndex) {
      const currentPackage = packageIndex[pkg]
      expect(currentPackage).toBeType('object')
    }
  })

  it('serialises each package into an object with string keys', () => {
    for (const pkg in packageIndex) {
      const currentPackage = packageIndex[pkg]

      for (const field in currentPackage) {
        const currentField = currentPackage[field]
        expect(currentField).toBeType('string')
      }
    }
  })

  it('creates new index keys instead of including the Package field', () => {
    for (const pkg in packageIndex) {
      const currentPackage = packageIndex[pkg]
      expect(currentPackage.Package).toBe(undefined)
    }
  })
})
