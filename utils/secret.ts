export const GetSecret = () => {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || "";
  if (secret) {
    return secret;
  }
  console.error("JWT secret not found");
  return "";
};
