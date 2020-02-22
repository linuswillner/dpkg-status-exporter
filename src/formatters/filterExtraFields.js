/**
 * Filter extraneous fields from the dpkg status index
 * @param {Object} packageList Serialised dpkg status index
 * @returns {Object} Index where all fields except Description and Depends (If present) have been removed
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
