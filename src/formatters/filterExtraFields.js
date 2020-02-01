/**
 * Filter extraneous fields according to the spec for dpkg status data
 * @param packageData Serialised dpkg status data
 * @see https://www.reaktor.com/junior-dev-assignment/
 */
module.exports = packageData => {
  const fieldsToInclude = [
    'Description',
    'Depends'
  ]

  for (const pkg in packageData) {
    const currentPackage = packageData[pkg]

    for (const field in currentPackage) {
      if (!fieldsToInclude.includes(field)) delete currentPackage[field]
    }
  }

  return packageData
}
