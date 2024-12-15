import "./CardFlip.css";

const CardFlip: React.FC<{ titleFront: string; titleBack: string }> = ({
  titleFront,
  titleBack,
}) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">{titleFront}</div>
        <div className="flip-card-back">{titleBack}</div>
      </div>
    </div>
  );
};

export default CardFlip;
