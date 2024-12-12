"use client";
import { useState, useEffect } from "react";
import {
  the_psychology_of_money_bill_oxley_chapter1,
  the_psychology_of_money_bill_oxley_chapter2,
} from "@/constants/chapterMock";
import ReadingArea from "@/components/readingArea/ReadingArea";
import { useBook } from "@/context/bookContext";
import Title from "@/components/Title";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import type { PageAndTimestamp } from "@/model/bookModel";
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
    const chapterName =
      chapterIndex === 0
        ? the_psychology_of_money_bill_oxley_chapter1.title
        : the_psychology_of_money_bill_oxley_chapter2.title;
    const totalPage =
      chapterIndex === 0
        ? the_psychology_of_money_bill_oxley_chapter1.total
        : the_psychology_of_money_bill_oxley_chapter2.total;

    const pages: PageAndTimestamp[] =
      chapterIndex === 0
        ? the_psychology_of_money_bill_oxley_chapter1.pages.map(
            (page, index) => {
              return {
                sentences: page,
                sentenceEndTimestamp:
                  the_psychology_of_money_bill_oxley_chapter1.sentenceEndTimes[
                    index
                  ],
                firstSentenceStartAt:
                  the_psychology_of_money_bill_oxley_chapter1
                    .firstWordStartTime[index],
                lastSentenceEndAt:
                  the_psychology_of_money_bill_oxley_chapter1.lastWordEndTime[
                    index
                  ],
              };
            }
          )
        : the_psychology_of_money_bill_oxley_chapter2.pages.map(
            (page, index) => {
              return {
                sentences: page,
                sentenceEndTimestamp:
                  the_psychology_of_money_bill_oxley_chapter2.sentenceEndTimes[
                    index
                  ],
                firstSentenceStartAt:
                  the_psychology_of_money_bill_oxley_chapter2
                    .firstWordStartTime[index],
                lastSentenceEndAt:
                  the_psychology_of_money_bill_oxley_chapter2.lastWordEndTime[
                    index
                  ],
              };
            }
          );
    setTimeout(() => {
      setChapterPages(pages);
      setChapterMetadata({
        bookTitle: "The Psychology of Money",
        title: chapterName,
        chapterIndex: 0,
        pages: totalPage,
        audiobookLength: 100,
      });
      // setChapterIndex(0);
      setPageIndex(0);
    }, 500);
  }, [chapterIndex]);

  if (chapterPages.length === 0) {
    return <div>Loading...</div>;
  }

  const changingChapter = () => {
    setChapterIndex(chapterIndex === 0 ? 1 : 0);
  };

  return (
    <div className="flex flex-col w-full h-screen items-center">
      <Title title={chapterMetadata.bookTitle} />
      <div className="flex">
        <button className="px-4">prev</button>
        <Title title={chapterMetadata.title} />
        <button className="px-4" onClick={changingChapter}>
          next
        </button>
      </div>
      <ReadingArea
        onPageForward={handleChangePage}
        currentPageIndex={pageIndex}
      />
      {/* <AudioPlayer /> */}
      <AudioPlayer
        hlsUrl="https://r2-worker.testaudio.workers.dev/chapter1.m3u8?auth_key=jabr2worker"
        onPageForward={handleChangePage}
      />
    </div>
  );
}
