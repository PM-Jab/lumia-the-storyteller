import React, { useEffect, useState } from "react";
import "./CardSlide.css";

const CardSlide: React.FC<{
  title: string;
  slided: string;
  isSwitched: boolean;
}> = ({ title, slided, isSwitched }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isSwitched) {
      setIsHovered(true); // Simulate hover
      const timer = setTimeout(() => setIsHovered(false), 1000); // Reset after 1 second
      return () => clearTimeout(timer); // Cleanup timeout on unmount or change
    }
  }, [isSwitched]);

  return (
    <div className="slide-card">
      <div className={`slide-card-content ${isHovered ? "hovered" : ""}`}>
        <span className="slide-card-title">{title}</span>
        <span className="slide-card-slided">{slided}</span>
      </div>
    </div>
  );
};

export default CardSlide;
