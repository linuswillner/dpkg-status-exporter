const fs = require('fs')
const path = require('path')
const http = require('http')
const util = require('util')
const exportDpkgStatus = require('./src')

const readFile = util.promisify(fs.readFile)

// Remove 'node server.js' from argv
process.argv.splice(0, 2)

const port = process.argv[0] || 6500
// Only allow manual overrides in debug for security reasons
const dpkgStatusLocationOverride = process.env.DEBUG && process.argv[1]

if (process.env.DEBUG) console.warn('Starting in debug mode, manual overriding of the location of /var/lib/dpkg/status/ has been enabled!')
if (dpkgStatusLocationOverride) console.warn(`Manually overriding location of /var/lib/dpkg/status to ${dpkgStatusLocationOverride}.`)

http.createServer(async (req, res) => {
  console.debug(`Received request from ${req.connection.remoteAddress}.`)

  // Enforce always accessing the root
  if (req.url !== '/') {
    console.debug(`Requester requested to access unwanted path ${req.url}, redirecting...`)
    res.writeHead(301, { Location: '/' })
    res.end()
  }

  try {
    console.debug('Exporting /var/lib/dpkg/status and serving to requester...')

    await exportDpkgStatus(dpkgStatusLocationOverride)

    // Find the page to serve and read it
    const page = path.join(process.cwd(), 'pages/index.html')
    const content = await readFile(page)

    // Send the page
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(content)
    console.log('Success!')
  } catch (err) {
    console.error('Could not export and send /var/lib/dpkg/status index: ', err)
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end(`An internal server error occurred when attempting to serve this page:\n${err.stack}`)
  }
}).listen(port)

console.log(`Listening on port ${port}!`)
