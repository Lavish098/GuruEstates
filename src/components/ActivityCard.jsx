import React from "react";
import { assets } from "../assets/assets";

const ActivityCard = () => {
  return (
    <div className="">
      <div className=" left-[20px] top-[20px] absolute ">
        <img
          src={assets.share}
          alt=""
          className="w-6 h-6"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
      <div className="left-[20px] top-[80px] absolute ">
        <img
          src={assets.heart}
          alt=""
          className="w-6 h-6"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
      <div className=" right-[20px] top-[20px] absolute ">
        <img
          src={assets.incomingCall}
          alt=""
          className="w-6 h-6"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
      <div className="right-[20px] top-[80px] absolute ">
        <img
          src={assets.calender}
          alt=""
          className="w-6 h-6"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    </div>
  );
};

export default ActivityCard;
