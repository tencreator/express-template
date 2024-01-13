import Axios from "axios";
import logger from "./logger";

const Logger = new logger(new Date().toISOString().split('T')[0], 'CHECKERS')

export async function licenseCheck(licenseKey: string, product: string, uniqueId: number) {
    let checkres = await Axios({
        method: 'POST',
        url: `https://license.tencreator.xyz/api/check/${uniqueId}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': licenseKey, },
        params: { info: `${product} - Boot`, }
    });
    if (checkres.data.pass) {
        Logger.license( checkres.data.details);
    } else {
        Logger.license( checkres.data.details || 'License system is unreachable, try again later!')
        process.exit(1)
    }
    
    setInterval(async () => {
        let checkres = await Axios({
            method: 'POST',
            url: `https://license.tencreator.xyz/api/check/${uniqueId}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': licenseKey, },
            params: { info: `${product} - Check`, }
        });
        if (!checkres.data.authorized) {
            let bothfailed = true
            await new Promise(resolve => setTimeout(()=>{
                if (checkres.data.authorized) {
                    bothfailed = false
                }
            }, 3600000))
            if (bothfailed) {
                Logger.license( checkres.data.details || 'License system is unreachable, try again later!')
                process.exit(1)
            }
        }
    }, 3600000)
}

export async function versionCheck(version: string, product: number) {
    if (version === undefined || product === undefined) {
        return Logger.version("Version checker is incorrectly setup, contact the developer!")
    }

    let checkres: any = await Axios({
        method: 'GET',
        url: `https://store.tencreator.xyz/api/version/check?version=${encodeURIComponent(version)}&product=${encodeURIComponent(product)}`
    })
    if (checkres.data.same) {
        Logger.version("You are running the latest version of the bot!");
    } else {
        Logger.version("You are not running the latest version of the bot or the version checker is unavailable!")
    }

    setInterval(async () => {
        let checkres = await Axios({
            method: 'GET',
            url: `https://store.tencreator.xyz/api/version/check?version=${encodeURIComponent(version)}&product=${encodeURIComponent(product)}`
        })
        if (!checkres.data.same) {
            Logger.version("You are not running the latest version of the bot or the version checker is unavailable!")
        }
    }, 3600000)
}