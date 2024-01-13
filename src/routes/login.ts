import {Router, Request, Response} from 'express';
import passport from 'passport';
import { info } from '../utils/Config';
const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).render('login', {
        title: info.name,
        logo: info.icon,
        page: 'Login',
        user: req.user || undefined,
        isAuthenticated: req.isAuthenticated() || false
    });
});

router.get('/discord', passport.authenticate('discord'))

module.exports = router;