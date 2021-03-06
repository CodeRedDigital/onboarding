export default async function getRegTypes(req, res) {
  if (req.method === 'POST') {
    console.log(`push url ${req.body.endpoint}`)
    const amlCode = req.body.amlCode
    const user = req.body.user
    const firm = req.body.firm
    const sendSms =  req.body.sendSms
    const sendEmail =  req.body.sendEmail
    const dialCode =  req.body.dialCode
    const telephone =  req.body.telephone
    const email =  req.body.email
    const index = req.body.index
    const endpoint = req.body.endpoint
    const response = await fetch(`${process.env.CREDAS_URL}/registrations`, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'apikey': process.env.CREDAS_API_KEY
      },
      body: JSON.stringify({
        forename: user.firstName,
        surname: user.surname,
        regTypeId: amlCode,
        phoneNumber: telephone,
        diallingCode: dialCode,
        sendSms: sendSms,
        sendEmail: sendEmail,
        emailAddress: email,
        parameters: [
          {
            key: "ClientName",
            value: firm.name
          },
          {
            key: "ClientLogoUrl",
            value: firm.logos.colourPng
          },
          {
            key: "SolicitorID",
            value: firm.id
          }
        ]
      }),
      method: 'POST'
    })
    const data = await response.json()
    console.log(data)
    res.status(201).json({"status": response.status, index, data})
  }
}