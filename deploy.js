const childProcess = require('child_process')
const { promisify } = require('util')
const copyfiles = require('copyfiles')
const path = require('path')

const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

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
    const licenseFilePath = path.join('.', 'LICENSE')

    const distPath = path.join('.', 'dist')

    console.log(packageFilePath, distPath)
    await copyfiles([packageFilePath, readmeFilePath, licenseFilePath, distPath], { flat: true }, () => { console.log('Copied files') })
}

// Publish
const publish = async (otp) => {
    const publishCommand = `npm publish ./dist ---otp ${otp}`
    
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
    readline.question('OTP: ', async (_otp) => {
        readline.close()
        await publish(_otp)
    })

}


deploy()
