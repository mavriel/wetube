import { Router } from 'express';
import routes from './routes';
import {
  changePassword,
  editProfile,
  userDetail,
  users,
} from '../controllers/userController';

const userRouter = Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;