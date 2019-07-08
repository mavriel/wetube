import multer from 'multer';
import routes from './routers/routes';

const multerVideo = multer({ dest: 'uploads/videos/' });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || {};
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    return res.redirect(routes.home);
  }
  return next();
};

export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    return res.redirect(routes.home);
  }
  return next();
};

export const uploadVideo = multerVideo.single('videoFile');
