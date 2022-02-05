import database from '../../../libs/database';
import authorization from '../../../middlewares/authorization';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const auth = await authorization(req, res);
    const posts = await database('posts');

    res.status(200);
    res.json({
        message: 'post data',
        data: posts
    });

}