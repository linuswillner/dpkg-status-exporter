/**
 * Filter extraneous fields according to the spec for dpkg status data
 * @param {Object} packageList Serialised dpkg status data
 */
module.exports = packageList => {
  const fieldsToInclude = [
    'Description',
    'Depends'
  ]

  for (const pkg in packageList) {
    const currentPackage = packageList[pkg]

    for (const field in currentPackage) {
      if (!fieldsToInclude.includes(field)) delete currentPackage[field]
    }
  }

  return packageList
}
