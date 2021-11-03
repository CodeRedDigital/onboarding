try {
  const response = await AxiosThirdfort.post(
    "transactions",
    body,
    config
  );
  if (response.data) {
    console.log(response.data);
  }
} catch (error) {
  console.log(error);
  console.log(
    `transaction for ${user.firstName} ${user.surname} has failed`
  );
}
console.log("Hello World")
// const transactionBody = JSON.parse(body)
// const transactionConfig = JSON.parse(body.config)
// const transactionUser = JSON.parse(body.user)
export default async function transaction(req, res) {
  res = await fetch(`${process.env.THIRD_URL}transactions`,{
    body: transactionBody,
    header: transactionConfig,
    method: 'POST'
  })
  const result = await res.json()
  return {result, transactionUser}
}