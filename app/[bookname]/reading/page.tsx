"use client";
import { useState, useEffect } from "react";
import { the_psychology_of_money_bill_oxley_chapter1 } from "@/constants/chapterMock";
import ReadingArea from "@/components/readingArea/ReadingArea";
import { useBook } from "@/context/bookContext";
import Title from "@/components/Title";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
// import AudioPlayer from "@/components/customAudioPlayer/customAudioPlayer";

export default function Reading() {
  // const [bookPages, setBookPages] = useState<string[][]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const {
    chapterPages,
    setChapterPages,

    chapterMetadata,
    setChapterMetadata,

    chapterIndex,
    setChapterIndex,

    pageIndex,
    setPageIndex,
  } = useBook();

  const handleChangePage = (isForward: boolean) => {
    console.log("change page isForward: ", isForward);
    if (isForward) {
      if (pageIndex + 1 < chapterMetadata.pages) {
        setPageIndex(pageIndex + 1);
      }
    } else {
      if (pageIndex - 1 >= 0) {
        setPageIndex(pageIndex - 1);
      }
    }
  };

  // fetch book data from the server
  useEffect(() => {
    // mock fetch book data from the server
    setTimeout(() => {
      setChapterPages(the_psychology_of_money_bill_oxley_chapter1.sentences);
      setChapterMetadata({
        bookTitle: "The Psychology of Money",
        title: "Chapter 1",
        chapterIndex: 0,
        pages: 10,
        audiobookLength: 100,
      });
      setChapterIndex(0);
      setPageIndex(0);
    }, 500);
  }, []);

  if (chapterPages.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Title title={chapterMetadata.bookTitle} />
      <Title title={chapterMetadata.title} />
      <ReadingArea
        onPageForward={handleChangePage}
        currentPageIndex={pageIndex}
      />
      {/* <AudioPlayer /> */}
      <AudioPlayer hlsUrl="https://r2-worker.testaudio.workers.dev/chapter1.m3u8?auth_key=jabr2worker" />
    </div>
  );
}
