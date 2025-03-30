import jwt from "jsonwebtoken";

const GenerateJWT = (payload: any, secret: string) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "5m",
  });
  return token;
};

const VerifyJWT = (token: string, secret: any) => {
  return jwt.verify(token, secret);
};

export { GenerateJWT, VerifyJWT };
