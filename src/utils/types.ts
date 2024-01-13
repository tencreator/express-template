import { Request, Response } from "express"

export interface user {
    id: number
    username: string
    email: string
    provider: string
    perms: number[]
}

export interface discordUser extends user {
    global_name: string
    banner?: string
    banner_decoration_data?: string | undefined
    avatar_decoration_data?: string | undefined
    banner_color?: string | undefined
    discriminator?: string
    avatar?: string
    bot?: boolean
    mfa_enabled?: boolean
    locale?: string
    verified?: boolean
    flags?: number
    public_flags: number
    premium_type: number
    accessToken?: string

    guilds: number[]
}

export interface json {
    port: number
    baseurl: string
    license: string
    debug: {
        other: boolean
        logger: boolean
    }
    staff: number[]
    info: {
        name: string
        icon: string
    }
    discord: {
        token: string
        clientid: string
        clientsecret: string
    }
    mysql: {
        host: string
        user: string
        password: string
        database: string
    }
}

export interface productInfo {
    id: number
    name: string
    version: string    
}

export interface routingOptions {
    req: Request
    res: Response
    next?: Function
    data?: any
}