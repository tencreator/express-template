import { discord, baseURL } from "./Config";
import passport from "passport";
import logger from "./logger";
import { Strategy as discordStrategy } from "passport-discord";
import { discordUser } from "./types";

const Logger = new logger(new Date().toISOString().split('T')[0], 'AUTHENTICATION')

const scopes = [
    "identify",
    "email",
    "guilds",
    "guilds.join"
]

passport.serializeUser((user: any, callback)=>{
    process.nextTick(()=>{
        Logger.debug(`Serializing user ${user.id}`)
        callback(null, user)
    })
})

passport.deserializeUser((user: any, callback)=>{
   process.nextTick(()=>{
    Logger.debug(`Deserializing user ${user.id}`)
    return callback(null, user)
   }) 
})

if (discord.clientid && discord.clientsecret){
    Logger.debug(`Discord authentication is enabled`)
    passport.use(new discordStrategy({
        clientID: discord.clientid,
        clientSecret: discord.clientsecret,
        callbackURL: `${baseURL}/api/discord/callback`,
        scope: scopes
    }, async function(accessToken: string, refreshToken: string, profile: discordUser, done: any) {
        Logger.debug(`User ${profile.id} authenticated`)
        done(null, profile)
    }))
}