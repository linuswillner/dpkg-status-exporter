/**
 * Debian control file to JSON serialiser
 * @param controlFile The UTF-8 encoded contents of a file using Debian control file syntax.
 * @see https://www.debian.org/doc/debian-policy/ch-controlfields.html
 */
module.exports = controlFile => {
  // Split file content into an array of lines
  const lines = controlFile.split('\n')

  const packages = {}

  // Create a tracker for current package and field
  const current = {
    package: null,
    field: null
  }

  for (const line of lines) {
    // Lines that start with whitespace are continuation lines per Debian control file policy
    const isContinuationLine = line => /^\s/g.test(line)

    // Don't treat continuation lines as new fields, instead append their content to the most recent field
    if (isContinuationLine(line)) {
      packages[current.package][current.field] += `\n${line}`
    } else if (line !== '') { // Skip empty lines between packages
      // Split at colons, extract the name and join the rest back together (In case there are multiple colons)
      const separated = line.split(':')
      const name = separated.splice(0, 1)[0].trim()
      const value = separated.join('').trim()

      // The Package field denotes a new package
      if (name === 'Package') {
        // Add a new package record
        current.package = value
        packages[current.package] = {}
      } else {
        // Add a new field and append value
        current.field = name
        packages[current.package][current.field] = value
      }
    }
  }

  return packages
}
