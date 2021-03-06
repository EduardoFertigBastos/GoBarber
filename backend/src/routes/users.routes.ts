import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import uplodConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
const usersRoute = Router();
const upload = multer(uplodConfig);


interface UserRetorno {
    name: string;
    email: string;
    password?: string;
}

usersRoute.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: UserRetorno = await createUser.execute({ name, email, password })
    
    delete user.password;

    return response.json(user);
});

usersRoute.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request?.file?.filename ?? ''
    });
    delete user.password;
    return response.json(user)
});

export default usersRoute;