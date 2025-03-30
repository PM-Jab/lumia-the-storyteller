"use server";
import { GenerateJWT } from "../utils/jwtToken";

export const getBookProfile = async (title: string) => {
  const url = `https://book-detail-worker.testaudio.workers.dev/book-detail/metadata/profile?title=${title}`;
  const header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${GenerateJWT(
      { title: title },
      process.env.JWT_SECRET || ""
    )}`,
  };
  try {
    const response = await fetch(url, {
      headers: header,
      method: "GET",
    });
    const data = await response.json();
    return { result: data, error: null, status: "SUCCESS" };
  } catch (error) {
    console.error("Error fetching profile with axios:", error);
    return { result: null, error: error, status: "FAIL" };
  }
};
