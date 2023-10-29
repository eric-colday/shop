import React, { useEffect, useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };

  //timer sliders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="slider relative">
      <div
        className="container"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
      </div>
      <div className="icons">
        <div
          className="icon"
          onClick={prevSlide}
          style={{
            border: "1px solid #008080",
          }}
        >
          <WestOutlinedIcon
            style={{
              color: "#008080",
            }}
          />
        </div>
        <div
          className="icon"
          onClick={nextSlide}
          style={{
            border: "1px solid #008080",
          }}
        >
          <EastOutlinedIcon
            style={{
              color: "#008080",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
