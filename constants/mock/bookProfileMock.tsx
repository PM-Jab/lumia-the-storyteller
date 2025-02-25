import type { BookMetadata } from "@/model/bookModel";

export const mockBookProfile: BookMetadata = {
  title: "The Psychology of Money",
  author: "Morgan Housel",
  pages: 300,
  audiobookLength: 22, // hours
  publisher: "Houghton Mifflin Harcourt",
  genre: "Money",
  rating: 4.0,
  totalReviews: 123,
  chapterLists: [
    "Chapter 1: No one is crazy",
    "Chapter 2: Luck & Risk",
    "Chapter 3: Never enough",
    "Chapter 4: Confounding Compounding",
    "Chapter 5: Getting Wealthy vs Staying Wealthy",
    "Chapter 6: Tails, You Win",
    "Chapter 7: Freedom",
    "Chapter 8: Man in the Car Paradox",
    "Chapter 9: Wealth Is What You Don’t See",
  ],
  voiceModel: "Bill Oxley",
};
