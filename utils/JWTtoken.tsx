import jwt from "jsonwebtoken";

const GenerateJWT = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "", {
    algorithm: "HS256",
    expiresIn: "5m",
  });
};

const VerifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET || "");
};

export { GenerateJWT, VerifyJWT };
