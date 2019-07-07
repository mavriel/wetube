import { Router } from 'express';
import routes from './routes';
import {
  changePassword,
  editProfile,
  userDetail,
  users,
} from '../controllers/userController';
import { onlyPrivate } from '../midlewares';

const userRouter = Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
