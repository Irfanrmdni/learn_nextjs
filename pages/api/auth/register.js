import database from '../../../libs/database';
import bcryptjs from 'bcryptjs';
import bcrypt from 'bcryptjs/dist/bcrypt';

export default async function handler(req, res) {

    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const register = await database('users').insert({
        email,
        password: passwordHash
    });

    const registeredUser = await database('users').where({ id: register }).first();

    res.status(200);
    res.json({
        message: 'user registered successfuly',
        data: registeredUser
    });
}