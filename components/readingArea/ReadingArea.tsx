"use client";
import { useRef } from "react";
import type { BookReaderProps } from "../../model/bookModel";
import { useBook } from "@/context/bookContext";
import "./ReadingArea.css";

const ReadingArea: React.FC<BookReaderProps> = ({
  onPageForward,
  currentPageIndex,
}) => {
  const { chapterPages, highlightedIndex } = useBook();
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, currentTarget } = event;
    const { left, right } = currentTarget.getBoundingClientRect();

    if (clientX - left < 100) {
      onPageForward(false);
    } else if (right - clientX < 100) {
      onPageForward(true);
    }
  };
  return (
    <div className="book-container" onClick={handleClick}>
      <div className="book-text">
        {/* <p>{chapterPages[currentPageIndex].sentences}</p> */}
        {chapterPages[currentPageIndex].sentences.map((sentence, index) => (
          <span
            className={
              index === highlightedIndex ? "bg-yellow-200" : "opacity-50"
              // index % 2 === 0 ? "bg-yellow-200" : "bg-green-200"
            }
            key={index}
          >
            {sentence}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReadingArea;
