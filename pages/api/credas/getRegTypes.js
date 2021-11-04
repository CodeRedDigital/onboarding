export default async function getRegTypes(req, res) {
  const response = await fetch(`${process.env.CREDAS_URL}/reg-types`, {
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.CREDAS_API_KEY
    },
    method: 'GET'
  })
  const data = await response.json()
  console.log(data)
  res.status(201).json({data})
}