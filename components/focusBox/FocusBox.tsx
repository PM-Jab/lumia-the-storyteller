import { words } from "@/constants/words";
import React from "react";

const FocusBox: React.FC<{ pageIndex: number }> = ({ pageIndex }) => {
  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-4 shadow-lg">
      {words[pageIndex].word.map((word, index) => (
        <div key={index} className="mt-2">
          {word}:: {words[pageIndex].short[index]}
        </div>
      ))}
    </div>
  );
};

export default FocusBox;
