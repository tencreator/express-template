import express, { Request, Response, Express, NextFunction, Router } from 'express'
import Passport from 'passport'
import Session from 'express-session'
import Chalk from 'chalk'
import fs from 'fs'
import { port, pId, pName, pVersion, license, info } from './utils/Config'
import { licenseCheck, versionCheck } from './utils/checkers'
import { logger } from './utils/logger'
const app = express()

{
    const logs = fs.readdirSync('./logs/'+ new Date().toISOString().split('T')[0]).filter(file => file.endsWith('.log'))
    const startMsg = `# ${new Date().toISOString()}] [${pName}] starting up... #`
    const boarders = ''.padStart(startMsg.length, '#')
    for (const file of logs) {
        let contents = fs.readFileSync(`./logs/${new Date().toISOString().split('T')[0]}/${file}`, 'utf8')
        contents += `\n\n${boarders}\n${startMsg}\n${boarders}\n\n`
        fs.writeFileSync(`./logs/${new Date().toISOString().split('T')[0]}/${file}`, contents)
    }
}

const Logger = new logger(new Date().toISOString().split('T')[0], 'SERVER')

console.clear()
console.log(`\n[${Chalk.yellow(new Date().toISOString())}] ` + Chalk.red(`[${pName}]`) + Chalk.green(` starting up...`))

licenseCheck(license, pName, pId)
versionCheck(pVersion, pId)

require('./utils/passport')

app
    .set('view engine', 'ejs')
    .use(express.static('public'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(Session({
        secret: "Hyperbolic Time Chamber",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        }
    }))
    .use(Passport.authenticate('session'))

    .get('/', (req: Request, res: Response) => {
        res.status(200).render('index', {
            title: info.name,
            logo: info.icon,
            page: 'Home',
            user: req.user || undefined,
            isAuthenticated: req.isAuthenticated() || false
        })
    })
    
    .get('/logout', (req: Request, res: Response) => {
        req.logout(function(err: any){
            if (err) Logger.fatal(err)
            res.redirect('/')
        })
    })

    .listen(port, () => {
        const Logger = new logger(`${new Date().toISOString().split('T')[0]}`, 'SERVER')
        Logger.info(`Server is running on port ${port}`)
    })

{
    const apiRoutes = fs.readdirSync('./src/api').filter(file => file.endsWith('.ts'))
    const routes = fs.readdirSync('./src/routes').filter(file => file.endsWith('.ts'))
    
    const apiLogger = new logger(new Date().toISOString().split('T')[0], 'API')
    for (const file of apiRoutes) {
        app.use(`/api/${file.split('.')[0]}`, require(`./api/${file.split('.')[0]}`))
        apiLogger.debug(`${Chalk.red.bold('[API]:')} Loaded /api/${file.split('.')[0]}`)
    }

    const routeLogger = new logger(new Date().toISOString().split('T')[0], 'ROUTES')
    for (const file of routes) {
        app.use(`/${file.split('.')[0]}`, require(`./routes/${file.split('.')[0]}`))
        routeLogger.debug((`${Chalk.red.bold('[ROUTES]:')} Loaded /${file.split('.')[0]}`))
    }
}

app.get('*', (req: Request, res: Response) => {
    res.status(404).render('404', {
        title: info.name,
        logo: info.icon,
        page: '404',
        user: req.user || undefined,
        isAuthenticated: req.isAuthenticated() || false
    })
})
