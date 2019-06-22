import { videos } from '../db';
import routes from '../routers/routes';

export const home = (req, res) => {
  res.render('home', { pageTitle: 'Home', videos: videos });
};

export const search = (req, res) => {
  const {
    query: { term },
  } = req;
  res.render('search', { pageTitle: 'Search', searchingBy: term, videos });
};

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'upload' });
};

export const postUpload = (req, res) => {
  const { file, title, description } = req.body;
  res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) => {
  res.render('videoDetail', { pageTitle: 'videoDetail' });
};
export const editVideo = (req, res) => res.send('editVideo');
export const deleteVideo = (req, res) => res.send('deleteVideo');
