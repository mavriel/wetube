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

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email: email || name,
        name,
        githubId: id,
        avatarUrl: avatar_url,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
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

export const getMe = (req, res) => {
  res.render('userDetail', { pageTitle: 'User Detail', user: req.user });
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
