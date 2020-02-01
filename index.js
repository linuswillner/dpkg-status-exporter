const fs = require('fs')
const debCtrlToJson = require('./src/debian-control-to-json')
const readDpkgStatus = require('./src/utils/readDpkgStatus')
const filterExtraFields = require('./src/formatters/filterExtraFields')
const formatDepends = require('./src/formatters/formatDepends')

;(async () => {
  const dpkgStatus = await readDpkgStatus() // Read /var/lib/dpkg/status
  const serialised = await debCtrlToJson(dpkgStatus) // Serialize Debian control file syntax to JSON
  const filtered = filterExtraFields(serialised) // Filter redundant fields from the serialised data
  const formatted = formatDepends(filtered)
  // TODO: Add reverse dependency logic
  // TODO: Write HTML formatter next
})()
