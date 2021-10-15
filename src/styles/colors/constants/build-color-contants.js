/**
 * To run this you have to use ts-node.
 * Or any typescript compiler for node.
 *
 */

const path = require('path')
const fs = require('fs-extra')
const createColor = require('../color').createColor

const args = process.argv.slice(2)

if (args.length < 2) {
    console.log('2 argument are required. Got:', args.length)
    process.exit()
}

const kebabToCamel = (s) => s.replace(/-./g, (x) => x.toUpperCase()[1])

const toWrite = `export const ${kebabToCamel(args[0])} = ${JSON.stringify(
    createColor(args[1])
)}`

fs.writeFile(path.join(__dirname, `${args[0]}.ts`), toWrite, (err) => {
    if (err) {
        console.log(err)
    }
})
