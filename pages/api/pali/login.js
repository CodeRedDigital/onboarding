export default async function transaction(req, res) {
  if (req.method === 'POST') {
    const config = req.body.config
    console.log(config)
    console.log(process.env.PALI_URL)
    const userEmail = req.body.userEmail
    const password = req.body.password
    const response = await fetch(`${process.env.PALI_URL}auth/login`, {
      body: {
        userName: "demo",
        userPassword: "walrus1"
     },
      headers: config,
      method: 'POST'
    })
    const data = await response.json()
    // const data = {
    //   config: config,
    //   email: userEmail,
    //   password: password
    // }
    console.log(data)
    res.status(201).json({"status": 201, data})
  }
}