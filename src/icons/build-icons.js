const fs = require('fs-extra')
const path = require('path')

// Helper functions
const readdir = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (error, files) => {
            if (error) {
                console.warn(`Not a folder. Ignoring: ${path}`)
                resolve([])
            }
            resolve(files)
        })
    })
}

const mkdirs = (path) => {
    return new Promise((resolve, reject) => {
        fs.mkdirs(path, (err) => {
            err ? reject(err) : resolve(path)
        })
    })
}

// paths
const iconsPath = path.join(
    __dirname,
    '..',
    '..',
    'node_modules',
    'remixicon',
    'icons'
)
const baseOutputPath = path.join(__dirname)

// icons array
let iconsFolder = []
let iconsList = []
let totalIcons = 0

async function getIconsList() {
    await readdir(iconsPath).then((folders) => {
        for (let i = 0; i < folders.length; i++) {
            if (folders[i][0] !== '.') iconsFolder.push(folders[i])
        }
    })

    for (let i = 0; i < iconsFolder.length; i++) {
        const folder = iconsFolder[i]
        const p = path.join(iconsPath, folder)

        await readdir(p).then((files) => {
            iconsList.push(files)
            totalIcons += files.length
        })
    }
}

async function readAndWrite(svgPath, output) {
    const file = await fs.readFile(svgPath, { encoding: 'utf8' })
    const fileName = path.basename(svgPath, '.svg') + '.tsx'

    const template = `import { IconContainer, IconContainerProps } from '../icon-container'

export default (props: IconContainerProps): JSX.Element =>
        <IconContainer {...props}>${file}</IconContainer>
`

    await fs.writeFile(path.join(output, fileName), template, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

async function mkDirs() {
    for (let i = 0; i < iconsFolder.length; i++) {
        const folder = iconsFolder[i]
        const p = path.join(baseOutputPath, folder)
        mkdirs(p).then(() =>
            process.stdout.write(`\rDir for ${folder} created.`)
        )
    }
}

async function init() {
    await getIconsList()
    console.log(iconsFolder)
    console.log('Total Folder: ', iconsFolder.length)
    console.log('Total Icons: ', totalIcons)
    await mkDirs()
    console.log('Directories Created')
    console.log('Writing files...')

    const fileList = []
    for (let i = 0; i < iconsFolder.length; i++) {
        const folder = iconsFolder[i]
        const obj = iconsList[i]
        const inputPath = path.join(iconsPath, folder)
        const outputPath = path.join(baseOutputPath, folder)

        for (let j = 0; j < obj.length; j++) {
            let fileName = obj[j]
            const svgPath = path.join(inputPath, fileName)
            await readAndWrite(svgPath, outputPath)
            let exportFileName = fileName
            if (exportFileName[0] === '2') {
                // Only two case, 24HourFinancialFill and 24HourFinancialLine
                exportFileName = 'twenty-four' + exportFileName.substr(2)
            }
            if (exportFileName[0] === '4') {
                exportFileName = 'four-' + exportFileName.substr(1)
            }
            exportFileName = exportFileName.replace(
                /(\w)(\w*)((\Wsvg)|\W*)/g,
                function (a, b, c) {
                    return `${b.toUpperCase()}${c.toLowerCase()}`
                }
            )

            fileName = fileName.split('.svg')[0]
            fileList.push([exportFileName, `./${folder}/${fileName}`])
        }
    }

    console.log('\nCreating Index Files..')

    let toWrite = ''
    for (let i = 0; i < fileList.length; i++) {
        const [fileName, filePath] = fileList[i]
        toWrite += `export {default as ${fileName}} from '${filePath}'\n`
    }

    await fs.writeFile(path.join(__dirname, 'index.ts'), toWrite, (err) => {
        if (err) {
            console.log(err)
        }
    })

    console.log('Completed!')
}

console.log('Building...')
init()
