import JSON from '../../config.json'
import { json, productInfo } from './types'

//// Product Config

const pId: number = 0
const pName: string = 'NEW PROJECT'
const pVersion: string = '0.0.1'

const product: productInfo = {
    id: pId,
    name: pName,
    version: pVersion
}

// JSON Config

const port: number = Number(JSON.port) || 3000
const baseURL: string = JSON.baseURL || `http://localhost:${JSON.port || 3000}`
const license: string = JSON.license || ''
// const debug: boolean = JSON.debug || false
const debug: { other: boolean, logger: boolean } = {
    other: JSON.debug.other || false,
    logger: JSON.debug.logger || false
}
const staff: number[] = JSON.staff || []

const info: { name: string, icon: string } = {
    name: JSON.info.name || 'Not Setup',
    icon: JSON.info.icon || 'https://cdn.discordapp.com/attachments/773460713315545088/773460739837442816/tencreator.png'
}

const discord: { token: string, clientid: string, clientsecret: string } = {
    token: JSON.discord.token || '',
    clientid: (JSON.discord.clientID) || '',
    clientsecret: (JSON.discord.clientSecret) || ''
}

const mysql: { host: string, user: string, password: string, database: string } = {
    host: JSON.mysql.host,
    user: JSON.mysql.username,
    password: JSON.mysql.password,
    database: JSON.mysql.database
}

const Config: json = {
    port: Number(JSON.port) || 3000,
    baseurl: JSON.baseURL || `http://localhost:${JSON.port || 3000}`,
    license: JSON.license || '',
    debug: {
        other: JSON.debug.other || false,
        logger: JSON.debug.logger || false
    },
    staff: JSON.staff || [],
    info: {
        name: JSON.info.name || 'Not Setup',
        icon: JSON.info.icon || 'https://cdn.discordapp.com/attachments/773460713315545088/773460739837442816/tencreator.png'
    },
    discord: {
        token: JSON.discord.token || '',
        clientid: (JSON.discord.clientID) || '',
        clientsecret: (JSON.discord.clientSecret) || ''
    },
    mysql: {
        host: JSON.mysql.host,
        user: JSON.mysql.username,
        password: JSON.mysql.password,
        database: JSON.mysql.database
    }
}


export { port, baseURL, license, debug, staff, info, discord, mysql, Config, product, pId, pName, pVersion }
