"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { words } from "@/constants/words";
import { money_audioURL } from "@/constants/mock/audiolinkMock";
import ReadingArea from "@/components/readingArea/ReadingArea";
import { useBook } from "@/context/bookContext";
import Title from "@/components/Title";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import type { FocusWord, PageAndTimestamp } from "@/model/bookModel";
import FocusBox from "@/components/focusBox/FocusBox";
import axios from "axios";
import { GenerateJWT } from "@/utils/jwtToken";
import { getChapterDetail, getChapterMeta } from "@/api/bookDetail";
// import AudioPlayer from "@/components/customAudioPlayer/customAudioPlayer";

const chapterData = async (title: string, chapterIndex: number) => {
  const res = await getChapterDetail(title, chapterIndex);
  if (res.status === "SUCCESS") {
    console.log("chapter data axios: ", res.result);
    return res.result;
  } else {
    console.error("Error fetching chapter data with axios:", res.error);
  }
};

const chapterMeta = async (title: string, chapterIndex: number) => {
  const res = await getChapterMeta(title, chapterIndex);
  if (res.status === "SUCCESS") {
    console.log("chapter meta axios: ", res.result);
    return res.result;
  } else {
    console.error("Error fetching chapter meta with axios:", res.error);
  }
};

export default function Reading() {
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

  const [audiolink, setAudiolink] = useState<string>("");
  const { theme, setTheme } = useTheme();

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
  // const mockFocusWords: FocusWord[][] = words.map((wordChap) => {
  //   return wordChap.word.map((word, index) => {
  //     return {
  //       word: word,
  //       short: wordChap.short[index],
  //       long: wordChap.long[index],
  //     };
  //   });
  // });

  const changingChapter = (isForword: boolean) => {
    if (isForword && chapterIndex + 1 < 11) {
      setChapterIndex(chapterIndex + 1);
      setPageIndex(0);
    } else if (!isForword && chapterIndex - 1 >= 1) {
      setChapterIndex(chapterIndex - 1);
      setPageIndex(0);
    }
  };

  useEffect(() => {
    const fetchChapterData = async () => {
      const res = await getChapterDetail(
        "The Psychology of Money",
        chapterIndex
      );

      if (res.status === "SUCCESS") {
        console.log("chapter data axios: ", res.result);
      } else {
        console.error("Error fetching chapter data with axios:", res.error);
      }

      const item: PageAndTimestamp[] = res.result.map((page: any) => {
        return {
          sentences: page.sentences,
          sentenceEndTimestamp: page.sentenceEndTimes,
          firstSentenceStartAt: page.firstSentenceStartAt,
          lastSentenceEndAt: page.lastSentenceEndAt,
        };
      });

      setChapterPages(item);
    };
    fetchChapterData();
  }, [chapterIndex]);

  useEffect(() => {
    const fetchChapterMeta = async () => {
      const res = await getChapterMeta("The Psychology of Money", chapterIndex);

      if (res.status === "SUCCESS") {
        console.log("chapter meta axios: ", res.result);
      } else {
        console.error("Error fetching chapter meta with axios:", res.error);
      }
      setChapterMetadata({
        bookTitle: res.result.bookTitle,
        title: res.result.title,
        chapterIndex: 0,
        pages: res.result.pages,
        audiobookLength: res.result.duration,
      });
    };
    fetchChapterMeta();
  }, [chapterIndex]);

  useEffect(() => {
    setAudiolink(
      `https://r2-worker.testaudio.workers.dev${
        money_audioURL[chapterIndex - 1]
      }`
    );
  }, [chapterIndex]);

  return (
    <div className="flex flex-col w-full h-screen items-center pt-20">
      <Title title={"The Psychology of Money"} />
      <div className="flex">
        <button
          className="px-4"
          onClick={() => {
            changingChapter(false);
          }}
        >
          prev
        </button>
        <Title title={chapterMetadata.title} />
        <button
          className="px-4"
          onClick={() => {
            changingChapter(true);
          }}
        >
          next
        </button>
      </div>

      {/* <FocusBox words={mockFocusWords[pageIndex]} /> */}

      {chapterMetadata.title?.length > 0 &&
      chapterPages.length > 0 &&
      audiolink != "" ? (
        <div className="lg:w-[720px]">
          <ReadingArea
            onPageForward={handleChangePage}
            currentPageIndex={pageIndex}
          />
          <AudioPlayer
            hlsUrl={audiolink}
            onPageForward={handleChangePage}
            secret={process.env.NEXT_PUBLIC_HLS_KEY || ""}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
