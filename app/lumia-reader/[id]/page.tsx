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
// import AudioPlayer from "@/components/customAudioPlayer/customAudioPlayer";

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
    if (isForword && chapterIndex + 1 < 22) {
      setChapterIndex(chapterIndex + 1);
      setPageIndex(0);
    } else if (!isForword && chapterIndex - 1 >= 0) {
      setChapterIndex(chapterIndex - 1);
      setPageIndex(0);
    }
  };

  useEffect(() => {
    axios
      .post(
        "https://book-detail-worker.testaudio.workers.dev/book-detail/chapterInquiry",
        JSON.stringify({
          chapterNumber: chapterIndex,
        })
      )
      .then((response) => {
        const chapterData: PageAndTimestamp[] = response.data.map(
          (page: any) => {
            return {
              sentences: page.sentences,
              sentenceEndTimestamp: page.sentenceEndTimes,
              firstSentenceStartAt: page.firstSentenceStartAt,
              lastSentenceEndAt: page.lastSentenceEndAt,
            };
          }
        );

        console.log("chapterData: ", chapterData);

        setChapterPages(chapterData);
      })
      .catch((error) => {
        console.error("Error fetching book content with axios:", error);
      });
  }, [chapterIndex]);

  useEffect(() => {
    axios
      .get(
        "https://book-detail-worker.testaudio.workers.dev/book-detail/metadata/chapter?chapterNumber=" +
          chapterIndex
      )
      .then((response) => {
        console.log("profile axios: ", response.data);
        setChapterMetadata({
          bookTitle: response.data.bookTitle,
          title: response.data.title,
          chapterIndex: 0,
          pages: response.data.pages,
          audiobookLength: response.data.duration,
        });
      })
      .catch((error) => {
        console.error("Error fetching book content with axios:", error);
      });
  }, [chapterIndex]);

  useEffect(() => {
    setAudiolink(
      `https://r2-worker.testaudio.workers.dev${
        money_audioURL[chapterIndex - 1]
      }?auth_key=${process.env.NEXT_PUBLIC_HlS_KEY}`
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
        <div>
          <ReadingArea
            onPageForward={handleChangePage}
            currentPageIndex={pageIndex}
          />
          <AudioPlayer hlsUrl={audiolink} onPageForward={handleChangePage} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
