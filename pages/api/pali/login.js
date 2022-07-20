export default async function transaction(req, res) {
  if (req.method === 'POST') {
    const config = req.body.config
    console.log(config)
    console.log(process.env.PALI_URL)
    const userEmail = req.body.userEmail
    const password = req.body.password
    const body = {
      userName: userEmail,
      userPassword: password
    }
    const testBody = {
      userName: "demo",
      userPassword: "walrus1"
    }
    const response = await fetch(`${process.env.PALI_URL}auth/login`, {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(testBody),
      method: 'POST'
    })
    const status = await response
    console.log(status)
    const data = await response.json()
    // const data = {
    //   config: config,
    //   email: userEmail,
    //   password: password
    // }
    console.log("data")
    console.log(data)
    res.status(201).json({"status": 201, data})
  }
}