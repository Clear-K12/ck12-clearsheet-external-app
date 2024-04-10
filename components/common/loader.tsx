import { Configuration } from "@environment/startUp";

const Loader = () => {
  return (
    <div className="overlay">
      <div className="loader-box">
        <img src={Configuration.ImageUrl + "scuba.png"} />
        <div className="waterBubble">
          <div className="box"></div>
          <div className="box1"></div>
          <div className="box2"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
