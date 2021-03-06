import { Router } from 'express';
import passport from 'passport';
import routes from './routes';
import { home, search } from '../controllers/videoController';
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  getMe,
} from '../controllers/userController';
import { onlyPrivate, onlyPublic } from '../midlewares';

const globalRouter = Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, onlyPrivate, getMe);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', { failureRedirect: routes.login }),
  function(req, res) {
    res.redirect(routes.home);
  }
);

export default globalRouter;
