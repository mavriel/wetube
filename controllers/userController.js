import passport from 'passport';

import routes from '../routers/routes';
import User from '../models/User';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;

  if (password !== password2) {
    res.status(400);
    return res.render('join', { pageTitle: 'Join' });
  }
  try {
    const user = await User({ name, email });
    await User.register(user, password);
    next();
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render('login');
};

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const users = (req, res) => {
  res.render('users');
};
export const userDetail = (req, res) => {
  res.render('userDetail');
};
export const editProfile = (req, res) => {
  res.render('editProfile');
};
export const changePassword = (req, res) => {
  res.render('changePassword');
};
