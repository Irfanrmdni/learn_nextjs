export default function handler(req, res) {
    res.status(200);
    // res.end('hallo api')
    res.json({
        message: 'ini testing post'
    });
}