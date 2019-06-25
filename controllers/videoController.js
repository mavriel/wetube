import routes from '../routers/routes';
import Video from '../models/Video';

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ _id: -1 })
    .catch(err => {
      console.log(err);
      return [];
    });
  res.render('home', { pageTitle: 'Home', videos: videos });
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: 'i' },
    });
  } catch {}
  res.render('search', { pageTitle: 'Search', searchingBy, videos });
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

export const videoDetail = async (req, res) => {
  console.log(req.params);
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    res.render('videoDetail', { pageTitle: video.title, video });
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
  } catch (err) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (err) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (err) {}
  res.redirect(routes.home);
};
