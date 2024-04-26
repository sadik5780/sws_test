import React from "react";
import Slider from "react-slick";

const LogoSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="brandSlider">
      <Slider {...settings}>
        <div>
          <h3>Brand Name 1</h3>
        </div>
        <div>
          <h3>Brand Name 2</h3>
        </div>
        <div>
          <h3>Brand Name 3</h3>
        </div>
        <div>
          <h3>Brand Name 4</h3>
        </div>
        <div>
          <h3>Brand Name 5</h3>
        </div>
        <div>
          <h3>Brand Name 6</h3>
        </div>
        <div>
          <h3>Brand Name 7</h3>
        </div>
        <div>
          <h3>Brand Name 8</h3>
        </div>
        <div>
          <h3>Brand Name 9</h3>
        </div>
      </Slider>
    </div>
  );
};

export default LogoSlider;
