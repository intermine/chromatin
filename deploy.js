const childProcess = require('child_process')
const { promisify } = require('util')
const copyfiles = require('copyfiles')
const path = require('path')

const exec = promisify(childProcess.exec)

// Build package
const build = async () => {
    const buildCommand = 'npm run prod'
    
    console.log(`[COMMAND]: ${buildCommand}`)
    
    const { stderr, stdout } = await exec(buildCommand);
    if (stderr) {
        throw new Error(`'${buildCommand}' failed with \n${stderr}`);
    }
    
    console.log(stdout)    
}

// Copy files
const copyImportantFiles = async () => {
    const packageFilePath = path.join('.', 'package.json')
    const readmeFilePath = path.join('.', 'README.md')

    const distPath = path.join('.', 'dist')

    console.log(packageFilePath, distPath)
    await copyfiles([packageFilePath, readmeFilePath, distPath], { flat: true }, () => { console.log('Copied files') })
}

// Publish
const publish = async () => {
    const publishCommand = 'npm publish ./dist'
    
    console.log(`[COMMAND]: ${publishCommand}`)
    const { stderr, stdout } = await exec(publishCommand);
    if (stderr) {
       console.log(`'${publishCommand}' failed with \n${stderr}`);
    }
    
    console.log(stdout)    
}

// Deploy
const deploy = async () => {
    await build()
    await copyImportantFiles()
    await publish()
}

deploy()
