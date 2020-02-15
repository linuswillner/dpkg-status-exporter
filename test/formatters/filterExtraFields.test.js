const createMockPackageIndex = require('../../test-utils/createMockPackageIndex')
const { filterExtraFields } = require('../../src/formatters')
let packageIndex

beforeAll(async () => {
  const index = await createMockPackageIndex()
  packageIndex = filterExtraFields(index)
})

describe('filterExtraFields formatter', () => {
  it('removes all fields except Description and Depends', () => {
    for (const pkg in packageIndex) {
      const currentPackage = packageIndex[pkg]

      // For packages with dependencies, expect both Description and Depends
      if (currentPackage.Depends) {
        expect(Object.keys(currentPackage)).toEqual(expect.arrayContaining(['Description', 'Depends']))
      } else {
        expect(Object.keys(currentPackage)).toEqual(['Description'])
      }
    }
  })
})
