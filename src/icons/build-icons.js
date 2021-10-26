const fs = require('fs-extra')
const path = require('path')
const childProcess = require('child_process')
const { promisify } = require('util')

const exec = promisify(childProcess.exec)

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
    const template = `
import { forwardRef } from 'react'
import cx from 'clsx'

import { createStyle, getThemeCSSObject } from '../../styles'
import type { ChromatinIcon } from '../types'

const useStyles = createStyle((theme) => ({
    root: (props: ChromatinIcon) => ({
        ...getThemeCSSObject(props?.csx?.root, theme)
    })
}))

export default forwardRef<any, ChromatinIcon>((props, ref): JSX.Element => {
    const { className, classes: _classes = {}, csx = {}, ...rest } = props
    const classes = useStyles({ className, classes: _classes, csx, ...rest})

    return (
        ${file.replace(
            /<svg/,
            '<svg className={cx(classes.root, _classes.root, className)} ref={ref} {...rest}'
        )}
    )
})    
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
    console.log('Now running prettier...')

    exec('npx prettier --write ' + __dirname)
}

console.log('Building...')
init()
