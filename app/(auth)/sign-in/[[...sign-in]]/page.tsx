// import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="h-screen w-full relative">
        <Image src={"/login.png"} alt="login" layout="fill" objectFit="cover" />
      </div>
      <div className="flex justify-center items-center h-screen order-first md:order-last">
        {/* <SignIn /> */}
      </div>
    </div>
  );
}
