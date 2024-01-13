import Chalk from "chalk"
import { debug } from "./Config";
import fs from "fs"

class logger extends Error {
    private file: string;
    private filePath: string;
    private fileContent: string;
    private module: string;

    constructor(file: string, module: string) {
        super()
        this.file = file
        this.module = module
        this.filePath = `./logs/${new Date().toISOString().split('T')[0]}/${this.module || 'global'}-${this.file}.log`
        this.fileContent = ''

        try {
            if (!fs.existsSync('./logs')) {
                fs.mkdirSync('./logs');
            }
        } catch (err) {
            console.log(err);
        }

        try {
            if (!fs.existsSync(`./logs/${new Date().toISOString().split('T')[0]}`)) {
                fs.mkdirSync(`./logs/${new Date().toISOString().split('T')[0]}`);
            }
        } catch (err) {
            console.log(err);
        }

        if (debug.logger) console.log(`[${Chalk.yellow(new Date().toISOString())}] [${Chalk.blueBright('LOGGER')}] ${Chalk.greenBright('Logger initialized By: ' + this.module || 'global')}`)
    }

    async error(message: string) {
        const time = new Date()
        
        try {
            fs.accessSync(this.filePath, fs.constants.F_OK)

            this.fileContent += fs.readFileSync(this.filePath, 'utf8')
        } catch {
            this.fileContent += ''
        }

        this.fileContent += `[${time.toISOString()}] [ERROR] ${message.toString().replace(/\033\[[0-9;]*m/g, '')}\n`
        console.log(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright('ERROR')}] ${message}`)

        try {
            fs.writeFileSync(this.filePath, this.fileContent)
        } catch {
            console.error(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright('ERROR')}] Failed to write to file ${this.filePath}`)
        }
    }

    async warn(message: string) {
        const time = new Date()

        try {
            fs.accessSync(this.filePath, fs.constants.F_OK)

            this.fileContent += fs.readFileSync(this.filePath, 'utf8')
        } catch {
            this.fileContent += ''
        }

        this.fileContent += `[${time.toISOString()}] [WARN] ${message.toString().replace(/\033\[[0-9;]*m/g, '')}\n`
        console.log(`[${Chalk.yellow(time.toISOString())}] [${Chalk.yellowBright('WARN')}] ${Chalk.green(message)}`)

        try {
            fs.writeFileSync(this.filePath, this.fileContent)
        } catch {
            console.error(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright('WARN')}] Failed to write to file ${this.filePath}`)
        }
    }

    async info(message: string) {
        const time = new Date()

        try {
            fs.accessSync(this.filePath, fs.constants.F_OK)

            this.fileContent += fs.readFileSync(this.filePath, 'utf8')
        } catch {
            this.fileContent += ''
        }

        this.fileContent += `[${time.toISOString()}] [INFO] ${message.toString().replace(/\033\[[0-9;]*m/g, '')}\n`
        console.log(`[${Chalk.yellow(time.toISOString())}] [${Chalk.blueBright('INFO')}] ${Chalk.green(message)}`)

        try {
            fs.writeFileSync(this.filePath, this.fileContent)
        } catch (err) {
            console.error(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright('ERROR')}] Failed to write to file ${this.filePath}`)
        }
    }

    async debug(message: string) {
        const time = new Date()

        try {
            fs.accessSync(this.filePath, fs.constants.F_OK)

            this.fileContent += fs.readFileSync(this.filePath, 'utf8')
        } catch {
            this.fileContent += ''
        }

        this.fileContent += `[${time.toISOString()}] [DEBUG] ${message.toString().replace(/\033\[[0-9;]*m/g, '')}\n`
        if (debug.other) console.log(`[${Chalk.yellow(time.toISOString())}] [${Chalk.greenBright('DEBUG')}] ${Chalk.blueBright(message)}`)

        try {
            fs.writeFileSync(this.filePath, this.fileContent)
        } catch {
            console.error(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright('DEBUG')}] Failed to write to file ${this.filePath}`)
        }
    }

    async fatal(message: string) {
        const time = new Date()

        try {
            fs.accessSync(this.filePath, fs.constants.F_OK)

            this.fileContent += fs.readFileSync(this.filePath, 'utf8')
        } catch {
            this.fileContent += ''
        }

        this.fileContent += `[${time.toISOString()}] [FATAL] ${message.toString().replace(/\033\[[0-9;]*m/g, '')}\n`
        console.log(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright('FATAL')}] ${Chalk.bgRed.bold(message)}`)

        try {
            fs.writeFileSync(this.filePath, this.fileContent)
        } catch {
            console.error(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright('FATAL')}] Failed to write to file ${this.filePath}`)
        }

        process.exit(1)
    }

    async license(message: string) {
        const time = new Date()

        try {
            fs.accessSync(this.filePath, fs.constants.F_OK)

            this.fileContent += fs.readFileSync(this.filePath, 'utf8')
        } catch {
            this.fileContent += ''
        }

        this.fileContent += `[${time.toISOString()}] [LICENSE SYSTEM] ${message.toString().replace(/\033\[[0-9;]*m/g, '')}\n`
        console.log(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright.bold('LICENSE SYSTEM')}] ${Chalk.green.bold(message)}`)

        try {
            fs.writeFileSync(this.filePath, this.fileContent)
        } catch {
            console.error(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright.bold('LICENSE SYSTEM')}] Failed to write to file ${this.filePath}`)
        }
    }

    async version(message: string) {
        const time = new Date()

        try {
            fs.accessSync(this.filePath, fs.constants.F_OK)

            this.fileContent += fs.readFileSync(this.filePath, 'utf8')
        } catch {
            this.fileContent += ''
        }

        this.fileContent += `[${time.toISOString()}] [VERSION CHECKER] ${message.toString().replace(/\033\[[0-9;]*m/g, '')}\n`
        console.log(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright.bold('VERSION CHECKER')}] ${Chalk.blue.bold(message)}`)

        try {
            fs.writeFileSync(this.filePath, this.fileContent)
        } catch {
            console.error(`[${Chalk.yellow(time.toISOString())}] [${Chalk.redBright.bold('VERSION CHECKER')}] Failed to write to file ${this.filePath}`)
        }
    }
}

process.on('uncaughtException', (err: any) => {
    console.log(Chalk.redBright('Uncaught Exception'))
    console.log(Chalk.redBright(err))
    const Logger = new logger(new Date().toISOString().split('T')[0], 'NODE-JS')
    Logger.fatal(err)
    process.exit(1)
})

process.on('unhandledRejection', (err: any) => {
    console.log(Chalk.redBright('Unhandled Rejection'))
    console.log(Chalk.redBright(err))
    const Logger = new logger(new Date().toISOString().split('T')[0], 'NODE-JS')
    Logger.fatal(err)
    process.exit(1)
})

process.on('warning', (warning: any) => {
    console.log(Chalk.redBright('Warning'))
    console.log(Chalk.redBright(warning))
    const Logger = new logger(new Date().toISOString().split('T')[0], 'NODE-JS')
    Logger.fatal(warning)
    process.exit(1)
})

export { logger }
export default logger