
export default async function transaction(req, res) {
  if (req.method === 'POST') {
    const config = req.body.config
    const body = req.body.body
    const user = req.body.user
    
    res.status(201).json({"foo": "bar"})
  }
}