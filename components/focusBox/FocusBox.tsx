import { words } from "@/constants/words";
import React from "react";
import CardSlide from "../card/cardSlide/CardSlide";

const FocusBox: React.FC<{ pageIndex: number }> = ({ pageIndex }) => {
  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 p-4 ">
      {words[pageIndex].word.map((word, index) => (
        <div className="w-32 h-12 mt-4">
          <CardSlide title={word} slided={words[pageIndex].short[index]} />
        </div>
      ))}
    </div>
  );
};

export default FocusBox;
