"use client";

import type { BookReaderProps } from "../../model/bookModel";
import { useBook } from "@/context/bookContext";
import "./ReadingArea.css";

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
  return (
    <div className="book-container" onClick={handleClick}>
      <div className="book-text">
        {chapterPages[currentPageIndex].sentences.map((sentence, index) => (
          <span
            className={
              index === highlightedIndex ? "bg-yellow-200" : "opacity-50"
            }
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
