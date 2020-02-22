// Creates a link element with a reference to the package in question that will jump to it and open its details
const createLink = packageName => `<a href="#${packageName}" onclick="jumpToPackage('${packageName}')">${packageName}</a>`

// Merge dependencies into an array and map alternates, if any, to links (If present in the index)
const mapDependencies = (dependencies, packageList) => {
  const dependencyList = []

  for (const dep in dependencies) {
    const { alternates } = dependencies[dep]

    if (alternates.length > 0) {
      // If alternate is included in the index, linkify it, otherwise just print its name
      const alternateLinks = alternates.map(alt => packageList[alt] ? createLink(alt) : alt)
      // Create link for original dependency as well and join it together with its alternates
      const formattedDependencies = `${createLink(dep)} <b>|</b> ${alternateLinks.join(' <b>|</b> ')}`
      dependencyList.push(formattedDependencies)
    } else {
      dependencyList.push(createLink(dep))
    }
  }

  return dependencyList
}

/**
 * Strip version numbers from the Depends field and format it to an array
 * @param {Object} packageList Fully serialised and processed dpkg status index
 */
module.exports = packageList => {
  const packageDetails = []

  for (const pkg in packageList) {
    const currentPackage = packageList[pkg]
    const dependencyLinks = mapDependencies(currentPackage.Depends, packageList).join(', ')
    const dependentLinks = currentPackage.Dependents.map(dep => createLink(dep)).join(', ')

    const hasDependencies = Object.keys(currentPackage.Depends).length > 0
    const hasDependents = currentPackage.Dependents.length > 0

    // Add data-testid properties only in testing mode (Ignoring else because tests can't run in prod mode and vice versa)
    const addTestId = id => process.env.TEST ? `data-testid="${id}"` : /* istanbul ignore next */ ''

    const html = `
      <li ${addTestId('package')}>
        <details ${addTestId('details')} id="${pkg}">
          <summary ${addTestId('summary')}>${pkg}</summary>
          <div ${addTestId('name')}><b>Name:</b> ${pkg}</div>
          <div ${addTestId('description')}><b>Description:</b> ${currentPackage.Description.replace(/\n/g, '<br>')}</div>
          <div ${addTestId('dependencies')}>${hasDependencies ? `<b>Dependencies:</b> ${dependencyLinks}` : ' '}</div>
          <div ${addTestId('dependents')}>${hasDependents ? `<b>Dependents:</b> ${dependentLinks}` : ' '}</div>
        </details>
      </li>
    `.trimRight() // Trim excess end whitespace

    packageDetails.push(html)
  }

  return packageDetails
}
