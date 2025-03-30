"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBook } from "@/context/bookContext";
import Link from "next/link";
import axios from "axios";
import { GenerateJWT } from "@/utils/jwtToken";
import { getBookProfile } from "@/api/bookProfile";
import RatingStar from "@/components/RatingStar";

const bookProfile = async (title: string) => {
  const res = await getBookProfile("The Psychology of Money");
  if (res.status === "SUCCESS") {
    console.log("profile axios: ", res.result);
    return res.result;
  } else {
    console.error("Error fetching profile with axios:", res.error);
  }
};

export default function Profile() {
  const { bookProfileMetadata, setBookProfileMetadata } = useBook();

  const [expanded, setExpanded] = useState(null);

  const toggleChapter = (index: any) => {
    setExpanded(expanded === index ? null : index);
  };

  useEffect(() => {
    const fetchBookProfile = async () => {
      setBookProfileMetadata(await bookProfile("The Psychology of Money"));
    };
    fetchBookProfile();
  }, []);

  if (!bookProfileMetadata.title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-black shadow-md rounded-lg overflow-hidden pt-20">
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
          {RatingStar(bookProfileMetadata.rating)}
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
