
export default async function transaction(req, res) {
  if (req.method === 'POST') {
    const config = req.body.config
    const body = req.body.body
    const index = req.body.index
    const response = await fetch(`${process.env.THIRD_URL}/transactions`, {
      body: JSON.stringify(body),
      headers: config,
      method: 'POST'
    })
    const data = await response.json()
    console.log(data)
    res.status(201).json({"index": index, data})
  }
}