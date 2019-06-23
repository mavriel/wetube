import routes from '../routers/routes';
import Video from '../models/Video';

export const home = async (req, res) => {
  const videos = await Video.find({}).catch(err => {
    console.log(err);
    return [];
  });
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

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });

  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) => {
  res.render('videoDetail', { pageTitle: 'videoDetail' });
};
export const editVideo = (req, res) => res.send('editVideo');
export const deleteVideo = (req, res) => res.send('deleteVideo');
