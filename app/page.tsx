"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser(); // Add isLoaded to check if the user data is ready
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isSignedIn, isLoaded, router]);

  // Only render the component if the user status is loaded
  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  return <div className="bg-[#f0ead2] w-full h-screen">Landing</div>;
}
