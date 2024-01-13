import { Router, Request, Response } from "express";
import passport from "passport";
const router = Router()

router.get('/', passport.authenticate('discord'))
router.get('/callback', passport.authenticate('discord', {  failureRedirect: '/login' }), (req: Request, res: Response) => res.redirect('/'))

module.exports = router