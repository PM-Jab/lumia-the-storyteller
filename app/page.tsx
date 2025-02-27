"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const book = [
    { name: "The Psychology of Money", path: "#" },
    // { name: "The-Psychology-of-Money", path: "#" },
    // { name: "The-Psychology-of-Money", path: "#" },
    // { name: "The-Psychology-of-Money", path: "#" },
  ];

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.push("/login");
  //   }
  // }, [isSignedIn, isLoaded, router]);

  // Only render the component if the user status is loaded
  // if (!isLoaded) {
  //   return null; // Or a loading spinner
  // }

  return (
    <div className="bg-[#f0ead2] dark:bg-black w-full h-screen flex flex-col items-center pt-20">
      <h1 className="text-4xl font-bold mb-8">Book Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {book.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg"
          >
            <Link href={`/profile/${item.name}`}>
              <Image
                src={"/psychology-money-cover.png"}
                alt="cover"
                width={200}
                height={300}
                className="rounded-md"
              />
            </Link>
            <p className="mt-4 text-lg font-medium text-black">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
