"use client";

import type { BookReaderProps } from "@/model/bookModel";
import { useBook } from "@/context/bookContext";
import "./ReadingArea.css";
import { useTheme } from "next-themes";

const ReadingArea: React.FC<BookReaderProps> = ({
  onPageForward,
  currentPageIndex,
}) => {
  const {
    chapterPages,
    highlightedIndex,
    toggleManualChange,
    setToggleManualChange,
  } = useBook();
  const { theme } = useTheme();
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, currentTarget } = event;
    const { left, right } = currentTarget.getBoundingClientRect();

    if (clientX - left < 100) {
      onPageForward(false);
      setToggleManualChange(!toggleManualChange);
    } else if (right - clientX < 100) {
      onPageForward(true);
      setToggleManualChange(!toggleManualChange);
    }
  };

  const checkTheme = (): string => {
    if (theme === "light") {
      return "bg-yellow-200";
    }
    return "";
  };

  return (
    <div className="book-container dark:bg-[#333]" onClick={handleClick}>
      <div className="book-text">
        {chapterPages[currentPageIndex].sentences.map((sentence, index) => (
          <span
            className={index === highlightedIndex ? checkTheme() : "opacity-50"}
            key={index}
          >
            {sentence}
          </span>
        ))}
        <div className="mt-10 pt-4"></div>
      </div>
    </div>
  );
};

export default ReadingArea;
