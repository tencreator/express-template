import mysql from 'mysql2/promise'
import { mysql as config } from './Config'
import { logger } from './logger'
import fs from 'fs'

const Logger = new logger(new Date().toString(), 'MySQL')

class database {
    private pool: mysql.Pool;

    constructor(setup: boolean) {
        this.pool = mysql.createPool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            multipleStatements: setup || false
        })

        this.pool.on('connection', (connection: mysql.PoolConnection) => {
            Logger.debug('New connection established')
        })

        this.pool.on('acquire', (connection: mysql.PoolConnection) => {
            Logger.debug('Connection acquired')
        })

        this.pool.on('release', (connection: mysql.PoolConnection) => {
            Logger.debug('Connection released')
        })

        this.pool.on('enqueue', () => {
            Logger.debug('Waiting for available connection slot')
        })
    }

    public async connect(): Promise<mysql.PoolConnection> {
        return await this.pool.getConnection()
    }

    public async close(): Promise<void> {
        await this.pool.end()
    }

    public async query(query: string, values?: any): Promise<any> {
        const conn = await this.connect()
        const result = await this.query(query, values)
        conn.release()
        return result
    }
}

class actions {
    constructor() {
        Logger.debug('New actions instance created')
    }
}

async function setup(): Promise<void> {
    Logger.info('Setting up database')
    const db = new database(true)
    const sql = fs.readFileSync('./setup.sql').toString()
    db.query(sql)
    Logger.info('Database setup complete')
}

async function newstring(length: number): Promise<string> {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export { actions, setup }