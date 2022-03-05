import { response, Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();


interface UserAuthenticated {
    id: string;
    name: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
}

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    
    const authenticateUser = new AuthenticateUserService();

    const authResponse = await authenticateUser.execute({ email, password });

    const user: UserAuthenticated = authResponse.user;
    const token = authResponse.token;

    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;