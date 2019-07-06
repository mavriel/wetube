import multer from 'multer';
import routes from './routers/routes';

const multerVideo = multer({ dest: 'uploads/videos/' });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.user = req.use || {};
  next();
};

export const uploadVideo = multerVideo.single('videoFile');
