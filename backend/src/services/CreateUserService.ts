import { startOfHour } from 'date-fns';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';


import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email: email }
        })
        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const user = usersRepository.create({
            name,
            email,
            password: await hash(password, 8),
        })

        await usersRepository.save(user);

        return user;
    }
}