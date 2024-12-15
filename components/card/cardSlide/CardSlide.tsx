import React from "react";
import "./CardSlide.css";

const CardSlide: React.FC<{ title: string; slided: string }> = ({
  title,
  slided,
}) => {
  return (
    <div className="slide-card">
      <div className="slide-card-content">
        <span className="slide-card-title">{title}</span>
        <span className="slide-card-slided">{slided}</span>
      </div>
    </div>
  );
};

export default CardSlide;
