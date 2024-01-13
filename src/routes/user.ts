import { Router, Request, Response } from "express";
import { info } from "../utils/Config";
const router = Router()

router.get('/', (req: Request, res: Response) => {
    if (!req.user) return res.redirect('/') 

    res.status(200).render('index', {
        title: info.name,
        logo: info.icon,
        page: 'Home',
        user: req.user || undefined,
        isAuthenticated: req.isAuthenticated() || false
    })
})

module.exports = router