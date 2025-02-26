"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBook } from "@/context/bookContext";
import Link from "next/link";
import axios from "axios";

export default function Profile() {
  const { bookProfileMetadata, setBookProfileMetadata } = useBook();

  const [expanded, setExpanded] = useState(null);

  const toggleChapter = (index: any) => {
    setExpanded(expanded === index ? null : index);
  };

  const renderStars = () => {
    const fullStars = Math.floor(bookProfileMetadata.rating);
    const halfStar = bookProfileMetadata.rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="h-6 w-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175.107l-.488 1.22c-.23.575-.98 1.17-1.739 1.17h-3.462c-.969 0-1.37-1.24-.588-1.81l2.8-2.034a1 1 0 00.364-1.118l-1.07-3.292z"></path>
          </svg>
        ))}
        {halfStar && (
          <svg
            className="h-6 w-6 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175.107l-.488 1.22c-.23.575-.98 1.17-1.739 1.17h-3.462c-.969 0-1.37-1.24-.588-1.81l2.8-2.034a1 1 0 00.364-1.118l-1.07-3.292z"></path>
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="h-6 w-6 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175.107l-.488 1.22c-.23.575-.98 1.17-1.739 1.17h-3.462c-.969 0-1.37-1.24-.588-1.81l2.8-2.034a1 1 0 00-.364-1.118l-1.07-3.292z"></path>
          </svg>
        ))}
      </>
    );
  };

  useEffect(() => {
    axios
      .get(
        "https://book-detail-worker.testaudio.workers.dev/book-detail/metadata/profile?title=the-psychology-of-money"
      )
      .then((response) => {
        console.log("profile axios: ", response.data);
        setBookProfileMetadata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile with axios:", error);
      });
  }, []);

  if (!bookProfileMetadata.title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden pt-20">
      <div className="relative">
        <div className="flex justify-center items-center">
          <Image
            src={"/psychology-money-cover.png"}
            alt="Book Cover"
            className="object-cover"
            width={400}
            height={550}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h2 className="text-white text-2xl font-bold">
            {bookProfileMetadata.title}
          </h2>
          <p className="text-white">By {bookProfileMetadata.author}</p>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Chapters</h3>
        {bookProfileMetadata.chapterLists.map((chapter, index) => (
          <div key={index} className="border-t">
            <button
              className="py-2 px-4 w-full text-left flex justify-between items-center"
              onClick={() => toggleChapter(index)}
            >
              {chapter}
              <span>{expanded === index ? "-" : "+"}</span>
            </button>
            {expanded === index && (
              <div className="p-4 text-gray-600">
                <p>Details about {chapter}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-100">
        <p className="mb-2">Pages: {bookProfileMetadata.pages}</p>
        <p className="mb-2">
          Audiobook Length: {bookProfileMetadata.audiobookLength}
        </p>
        <p className="mb-2">Publisher: {bookProfileMetadata.publisher}</p>
        <p className="mb-2">Genre: {bookProfileMetadata.genre}</p>

        <div className="flex items-center mt-4">
          {renderStars()}
          <p className="ml-2 text-gray-600">({bookProfileMetadata.rating})</p>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Wishlist
          </button>
          <Link href={`/lumia-reader/${bookProfileMetadata.title}`}>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Read Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
