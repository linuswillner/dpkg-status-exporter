const path = require('path')
const debCtrlToJson = require('./src/debian-control-to-json')
const readDpkgStatus = require('./src/utils/readDpkgStatus')
const createHTMLIndex = require('./src/utils/createHTMLIndex')
const {
  filterExtraFields,
  serializeDepends,
  parseDependents,
  generateHTML
} = require('./src/formatters')

;(async () => {
  try {
    const dpkgStatus = await readDpkgStatus() // Read /var/lib/dpkg/status
    const serialised = await debCtrlToJson(dpkgStatus) // Serialize Debian control file syntax to JSON
    const filtered = filterExtraFields(serialised) // Filter redundant fields from the serialised data
    const formatted = serializeDepends(filtered) // Serialize Depends field
    const withDependents = await parseDependents(formatted) // Parse out the dependents of each package
    const htmlList = generateHTML(withDependents) // Generate an HTML index of the package index
    await createHTMLIndex(htmlList) // Write the final output to out/index.html
    console.log(`Successfully exported /var/lib/dpkg/status to ${path.join(process.cwd(), 'out/index.html')}`)
  } catch (err) {
    console.error('Error: Could not export /var/lib/dpkg/status to HTML: ', err)
  }
})()
