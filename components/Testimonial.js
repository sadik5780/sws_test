"use client"; // for nextjs 13.4 user
import Link from "next/link";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const testimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,  
    slidesToScroll: 3,  
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "linear",
    swipeToSlide: true,
    nextArrow: null,
    prevArrow: null,
    responsive: [
        {
          breakpoint: 768, // define the breakpoint for small screens
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false, // disable center mode on small screens
          },
        },
      ],
  };
  const testimonialItems = [
    {
      id: 1,
      img: "../images/artStills/1.jpg",
      description:
        "To be concrete, descriptive writing has to offer specifics the reader can envision. Rather than “Her eyes were the color of blue rocks” (Light blue? Dark blue? Marble? Slate?), try instead, “Her eyes sparkled like sapphires in the dark.” ",
      name: "Sadik",
      designation: "Developer",
    },
    {
      id: 2,
      img: "../images/artStills/2.jpg",
      description:
        "To be concrete, descriptive writing has to offer specifics the reader can envision. Rather than “Her eyes were the color of blue rocks” (Light blue? Dark blue? Marble? Slate?), try instead, “Her eyes sparkled like sapphires in the dark.” ",
      name: "Sadik",
      designation: "Developer",
    },
    {
      id: 3,
      img: "../images/artStills/3.jpg",
      description:
        "To be concrete, descriptive writing has to offer specifics the reader can envision. Rather than “Her eyes were the color of blue rocks” (Light blue? Dark blue? Marble? Slate?), try instead, “Her eyes sparkled like sapphires in the dark.” ",
      name: "Sadik",
      designation: "Developer",
    },
    {
      id: 4,
      img: "../images/artStills/4.jpg",
      description:
        "To be concrete, descriptive writing has to offer specifics the reader can envision. Rather than “Her eyes were the color of blue rocks” (Light blue? Dark blue? Marble? Slate?), try instead, “Her eyes sparkled like sapphires in the dark.” ",
      name: "Sadik",
      designation: "Developer",
    },
    {
      id: 5,
      img: "../images/artStills/5.jpg",
      description:
        "To be concrete, descriptive writing has to offer specifics the reader can envision. Rather than “Her eyes were the color of blue rocks” (Light blue? Dark blue? Marble? Slate?), try instead, “Her eyes sparkled like sapphires in the dark.” ",
      name: "Sadik",
      designation: "Developer",
    },
    {
      id: 6,
      img: "../images/artStills/6.jpg",
      description:
        "To be concrete, descriptive writing has to offer specifics the reader can envision. Rather than “Her eyes were the color of blue rocks” (Light blue? Dark blue? Marble? Slate?), try instead, “Her eyes sparkled like sapphires in the dark.” ",
      name: "Sadik",
      designation: "Developer",
    },
  ];

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
        {testimonialItems.map((item) => (
            <div className="single-testimonial" key={item.id}>
              <p>{item.description}</p>
              <div className="client-info">
                <div className="client-video">
                  <a href="#">
                    <img src={item.img} alt="" />
                  </a>
                </div>
                <div className="client-details">
                  <h6>{item.name}</h6>
                  <span>{item.designation}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default testimonial;
