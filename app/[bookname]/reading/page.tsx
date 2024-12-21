"use client";
import { useState, useEffect } from "react";
import { the_psychology_of_money_bill_oxley } from "@/constants/chapterMock";
import { words } from "@/constants/words";
import ReadingArea from "@/components/readingArea/ReadingArea";
import { useBook } from "@/context/bookContext";
import Title from "@/components/Title";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import type { FocusWord, PageAndTimestamp } from "@/model/bookModel";
import FocusBox from "@/components/focusBox/FocusBox";
// import AudioPlayer from "@/components/customAudioPlayer/customAudioPlayer";

export default function Reading() {
  // const [bookPages, setBookPages] = useState<string[][]>([]);
  const {
    chapterPages,
    setChapterPages,

    chapterMetadata,
    setChapterMetadata,

    chapterIndex,
    setChapterIndex,

    pageIndex,
    setPageIndex,

    focusWords,
    setFocusWords,
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
    const chapterName = the_psychology_of_money_bill_oxley[chapterIndex].title;
    const totalPage = the_psychology_of_money_bill_oxley[chapterIndex].total;
    const chapterPageItems: PageAndTimestamp[] =
      the_psychology_of_money_bill_oxley[chapterIndex].pages.map(
        (page, index) => {
          return {
            sentences: page,
            sentenceEndTimestamp:
              the_psychology_of_money_bill_oxley[chapterIndex].sentenceEndTimes[
                index
              ],
            firstSentenceStartAt:
              the_psychology_of_money_bill_oxley[chapterIndex]
                .firstWordStartTime[index],
            lastSentenceEndAt:
              the_psychology_of_money_bill_oxley[chapterIndex].lastWordEndTime[
                index
              ],
          };
        }
      );
    const mockFocusWords: FocusWord[][] = words.map((wordChap) => {
      return wordChap.word.map((word, index) => {
        return {
          word: word,
          short: wordChap.short[index],
          long: wordChap.long[index],
        };
      });
    });

    setTimeout(() => {
      setChapterPages(chapterPageItems);
      setChapterMetadata({
        bookTitle: "The Psychology of Money",
        title: chapterName,
        chapterIndex: 0,
        pages: totalPage,
        audiobookLength: 100,
      });
      // setChapterIndex(0);
      setPageIndex(0);
      setFocusWords(mockFocusWords);
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

      <FocusBox words={focusWords[pageIndex]} />

      <ReadingArea
        onPageForward={handleChangePage}
        currentPageIndex={pageIndex}
      />
      <AudioPlayer
        hlsUrl="https://r2-worker.testaudio.workers.dev/the-psychology-of-money/the-psychology-of-money_bill-oxley_chapter01_hls/the-psychology-of-money_bill-oxley_chapter01.m3u8?auth_key=jabr2worker"
        onPageForward={handleChangePage}
      />
    </div>
  );
}
