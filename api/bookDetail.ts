"use server";
import { GenerateJWT } from "../utils/jwtToken";

export const getChapterDetail = async (title: string, chapterIndex: number) => {
  const url =
    "https://book-detail-worker.testaudio.workers.dev/book-detail/chapterInquiry";
  const header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${GenerateJWT(
      { title: title, chapterIndex: chapterIndex },
      process.env.JWT_SECRET || ""
    )}`,
  };
  const body = JSON.stringify({
    chapterNumber: chapterIndex,
  });
  try {
    const response = await fetch(url, {
      headers: header,
      body: body,
      method: "POST",
    });
    const data = await response.json();
    return { result: data, error: null, status: "SUCCESS" };
  } catch (error) {
    console.error("Error fetching profile with axios:", error);
    return { result: null, error: error, status: "FAIL" };
  }
};

export const getChapterMeta = async (title: string, chapterIndex: number) => {
  const url =
    "https://book-detail-worker.testaudio.workers.dev/book-detail/metadata/chapter?chapterNumber=" +
    chapterIndex;
  const header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${GenerateJWT(
      { title: title, chapterIndex: chapterIndex },
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
