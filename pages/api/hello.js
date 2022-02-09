// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // ? cara 1 JSON
  // res.status(200).json({ name: 'John Doe' })

  // ? cara 2 JSON
  // res.status(200);
  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({ name: 'irfan ramdani' }));

  // ? 3 STRING
  res.status(200)
  res.end('irfan ramdani')
}
