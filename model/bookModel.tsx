export interface BookReaderProps {
  onPageForward: (isNextPage: boolean) => void;
  currentPageIndex: number;
}

export interface TitleProps {
  title: string;
}

export interface HLSAudioplayerProps {
  hlsUrl: string;
  onPageForward: (isNextPage: boolean) => void;
}

// present on profile
export interface BookMetadata {
  title: string;
  author: string;
  pages: number;
  audiobookLength: number; // hours
  publisher: string;
  genre: string;
  rating: number;
  totalReviews: number;
  chapterLists: string[];
  voiceModel: string;
}

// actual used
export interface ChapterMetadata {
  bookTitle: string;
  title: string;
  chapterIndex: number;
  pages: number;
  audiobookLength: number; // seconds
}

export interface PageAndTimestamp {
  sentences: string[];
  sentenceEndTimestamp: number[];
  firstSentenceStartAt: number;
  lastSentenceEndAt: number;
}
