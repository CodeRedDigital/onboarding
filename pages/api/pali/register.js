export default async function transaction(req, res) {
  if (req.method === 'POST') {
    const config = req.body.config
    const userId = req.body.userId
    const userEmail = req.body.userEmail
    const password = req.body.password
    // const response = await fetch(`${process.env.THIRD_URL}/transactions`, {
    //   body: JSON.stringify(body),
    //   headers: config,
    //   method: 'POST'
    // })
    // const data = await response.json()
    const data = {
      config: config,
      id: userId,
      email: userEmail,
      password: password
    }
    console.log(data)
    res.status(201).json({"status": 201, data})
  }
}