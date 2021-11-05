export default async function getRegTypes(req, res) {
  if (req.method === 'POST') {
    const amlCode = req.body.amlCode
    const user = req.body.user
    const firm = req.body.firm
    const index = req.body.index
    const response = await fetch(`${process.env.CREDAS_URL}/registrations`, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'apikey': process.env.CREDAS_API_KEY
      },
      body: {
        forename: user.firstName,
        surname: user.surname,
        regTypeId: amlCode,
        phoneNumber: user.telNoDialCode,
        diallingCode: user.dialCode,
        sendSms: true,
        sendEmail: false,
        emailAddress: user.email,
        parameters: [
          {
            key: "ClientName",
            value: firm.Name
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
      },
      method: 'POST'
    })
    const data = await response.json()
    console.log(data)
    res.status(201).json({"status": response.status, index, data})
  }
}