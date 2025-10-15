import { GenerateJWT } from "@/utils/jwtToken";
export const AttractAuth = (url: string, secret: string) => {
  const token = GenerateJWT({}, secret);
  return url + "?auth=" + token;
};
