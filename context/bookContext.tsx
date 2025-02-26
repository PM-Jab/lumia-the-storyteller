"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import type {
  BookMetadata,
  ChapterMetadata,
  PageAndTimestamp,
  FocusWord,
} from "@/model/bookModel";

interface BookContextType {
  chapterPages: PageAndTimestamp[];
  setChapterPages: (page: PageAndTimestamp[]) => void;

  chapterIndex: number;
  setChapterIndex: (index: number) => void;

  pageIndex: number;
  setPageIndex: (index: number) => void;

  bookProfileMetadata: BookMetadata;
  setBookProfileMetadata: (metadata: BookMetadata) => void;

  chapterMetadata: ChapterMetadata;
  setChapterMetadata: (metadata: ChapterMetadata) => void;

  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;

  toggleManualChange: boolean;
  setToggleManualChange: (toggle: boolean) => void;

  focusWords: FocusWord[][];
  setFocusWords: (focusWords: FocusWord[][]) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chapterPages, setChapterPages] = useState<PageAndTimestamp[]>([]);
  const [chapterIndex, setChapterIndex] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [bookProfileMetadata, setBookProfileMetadata] = useState<BookMetadata>({
    title: "",
    author: "",
    pages: 0,
    audiobookLength: 0,
    publisher: "",
    genre: "",
    rating: 0,
    totalReviews: 0,
    chapterLists: [],
    voiceModel: "",
  });
  const [chapterMetadata, setChapterMetadata] = useState<ChapterMetadata>({
    bookTitle: "",
    title: "",
    chapterIndex: 0,
    pages: 0,
    audiobookLength: 0,
  });
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [toggleManualChange, setToggleManualChange] = useState<boolean>(false);
  const [focusWords, setFocusWords] = useState<FocusWord[][]>([]);

  return (
    <BookContext.Provider
      value={{
        chapterPages,
        setChapterPages,

        chapterIndex,
        setChapterIndex,

        pageIndex,
        setPageIndex,

        bookProfileMetadata,
        setBookProfileMetadata,

        chapterMetadata,
        setChapterMetadata,

        highlightedIndex,
        setHighlightedIndex,

        toggleManualChange,
        setToggleManualChange,

        focusWords,
        setFocusWords,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

// Custom hook to use the BookContext
export const useBook = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
};
