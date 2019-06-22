import routes from '../routers/routes';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = (req, res) => {
  const { name, email, password, password2 } = req.body;

  if (password !== password2) {
    res.status(400);
    return res.render('join', { pageTitle: 'Join' });
  }
  return res.redirect(routes.home);
};

export const getLogin = (req, res) => {
  res.render('login');
};

export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
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
