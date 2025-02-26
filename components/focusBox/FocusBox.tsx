import { words } from "@/constants/words";
import React from "react";
import CardSlide from "../card/cardSlide/CardSlide";
import { FocusWord } from "@/model/bookModel";

const FocusBox: React.FC<{ words: FocusWord[] }> = ({ words }) => {
  return (
    <div className="fixed top-1/2 left-20 transform -translate-y-1/2 p-4 ">
      {words.map((word, index) => (
        <div key={index}>
          <CardSlide title={word.word} slided={word.short} isSwitched={false} />
        </div>
      ))}
    </div>
  );
};

export default FocusBox;
