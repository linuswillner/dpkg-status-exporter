const fs = require('fs')
const util = require('util')
const os = require('os')
const path = require('path')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const mkdir = util.promisify(fs.mkdir)

module.exports = async htmlList => {
  const templateFile = path.join(process.cwd(), 'src/pages/template.html')
  const outputPath = path.join(process.cwd(), 'pages')
  const outputFile = path.join(process.cwd(), 'pages/index.html')

  try {
    // Read template and inject data
    const template = await readFile(templateFile, { encoding: 'utf-8' })
    const html = template.replace('[packageList]', htmlList.join(os.EOL))

    // Ensure output directory; using existsSync because exists is deprecated
    if (!fs.existsSync(outputPath)) await mkdir(outputPath)

    await writeFile(outputFile, html)
  } catch (err) {
    throw new Error(`Could not generate HTML index from template: ${err}`)
  }
}
