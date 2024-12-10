import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="px-10 md:px-28 lg:px-44 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-[70px] text-black font-extrabold py-10">
            The New Experience Of Reading Books
          </h2>
          <div className="text-2xl text-black font-light flex flex-col space-y-4 max-w-md">
            <p>
              Let us help you gain knowledge from books and share your own
              understanding with others.
            </p>
            <p>Or just create your own story and share it with the world!</p>
          </div>
          <Link href="/create-story">
            <Button size="lg" color="primary" className="mt-10">
              Get Started
            </Button>
          </Link>
        </div>

        <div>
          <Image
            src={"/cool-book.png"}
            alt="hero"
            width={700}
            height={400}
            className="py-10"
          />
        </div>
      </div>
    </div>
  );
}
