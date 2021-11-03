import jwt from 'jsonwebtoken'

const { sign } = jwt

export default function createJWT(req, res) {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600;
  const jwtHeader = { algorithm: "RS256", keyid: process.env.THIRD_KID };
  const jwtPayLoad = {
    aud: process.env.THIRD_URL,
    exp: exp,
    iat: now,
    iss: process.env.THIRD_EMAIL,
    sub: process.env.THIRD_EMAIL
  };
  const privateKey = process.env.RSA_PRIVATE_KEY.replace(/\\n/g, "\n");
  const token = sign(jwtPayLoad, privateKey, jwtHeader);
  // save the token to state
  const tokenExpiry = now + 3590;
  res.status(200).json({ token, tokenExpiry })
}