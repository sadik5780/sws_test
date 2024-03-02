"use client";

import Head from "next/head";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import throttle from "lodash/throttle";
import Link from "next/link";
import Testimonial from "@/components/Testimonial";
import Team from "@/components/team";


export default function Home() {
  // OnScroll Animation Initiate
  useEffect(() => {
    AOS.init();
  }, []);

  const triggerElements = [
    ".image",
    ".image1",
    ".image2",
    ".image3",
    ".image4",
    ".image5",
    ".image6",
    ".image7",
    ".image8",
    ".image9",
    ".image10",
    ".image11",
    ".image12",
    ".image13",
    ".image14",
    ".image15",
    ".image16",
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    triggerElements.forEach((element, index) => {
      const el = document.querySelector(element);

      if (el) {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top center",
            end: "center bottom",
            scrub: 0.5,
            onEnter: () => {
              const groupIndex = Math.floor(index / 4);
              const direction = index % 4 < 2 ? -1 : 1;
              const spacing = 50; // Adjust the spacing value as needed

              gsap.to(el, {
                x: direction * (350 + spacing),
                ease: "power1.inOut",
              });
            },
            onLeaveBack: () => {
              gsap.to(el, {
                x: 0,
                ease: "power1.inOut",
              });
            },
          },
        });
      }
    });
  }, [triggerElements]);

  return (
    <>
      <Head>
        <title>Home | Social Whistles Studio</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="" />
        <link rel="canonical" href="https://socialwhistles.studio/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Home | Social Whistles Studio" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="https://socialwhistles.studio/" />
        <meta property="og:site_name" content="Social Whistles Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:label1" content="Est. reading time" />
        <meta name="twitter:data1" content="1 minute" />
      </Head>
      
      {/* Hero Section Start */}
      <div
        className="hero_section hero_bg"
        data-aos="zoom-in"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1500"
      >
        <div className="container">
          <div className="hero_text">
            <div className="ht_top">
              <p className="common_text">
                A boutique creative and strategic agency that helps your brand
                speak visually.
              </p>
            </div>

            <div className="ht_middle">
              <p className="middle_small_text">With our team of</p>

              <div className="middle_main_text">
                
                <p className="text-container">
                  <span>brand strategists</span>
                  <span>writers</span>
                  <span>cinematographers</span>
                  <span>editors</span>
                  <span>3D animators</span>
                </p>
              </div>

              <p className="middle_small_text">
                We have <span>successfully</span> created <br />
                viral moments for a <span>decade.</span>
              </p>
            </div>

            <div className="ht_bottom">
              <p className="common_text">
                We provide brand solutions by striking a balance between
                original and trending content.
              </p>
            </div>
          </div>
        </div>

        {/* <div className="bg_text">
          <div className="bg-text-container">
            <div className="item-text">
              <p>strategists</p>
              <p>strategists</p>
              <p>strategists</p>
              <p>strategists</p>
            </div>
            <div className="item-text">
              <p>writers</p>
              <p>writers</p>
              <p>writers</p>
              <p>writers</p>
            </div>
            <div className="item-text">
              <p>cinematographers</p>
              <p>cinematographers</p>
              <p>cinematographers</p>
              <p>cinematographers</p>
            </div>
            <div className="item-text">
              <p>editors</p>
              <p>editors</p>
              <p>editors</p>
              <p>editors</p>
            </div>
            <div className="item-text">
              <p>3D animators</p>
              <p>3D animators</p>
              <p>3D animators</p>
              <p>3D animators</p>
            </div>
          </div>
        </div> */}
      </div>
      {/* Hero Section End */}

      {/* Work Category Section Start */}

      <section className="work_categories" id="example-anchor">
        <div className="wc-section">
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/1.jpg" alt="" className="image" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/2.jpg" alt="" className="image1" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/3.jpg" alt="" className="image2" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/4.jpg" alt="" className="image3" />
          </div>
        </div>
      </section>

      {/* Work Category Section End */}

      {/* Additional Section 1 */}
      <section className="work_categories" id="example-anchor">
        <div className="wc-section">
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/1.jpg" alt="" className="image4" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/2.jpg" alt="" className="image5" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/3.jpg" alt="" className="image6" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/4.jpg" alt="" className="image7" />
          </div>
        </div>
      </section>
      {/* Additional Section 1 End */}

      {/* Additional Section 2 */}
      <section className="work_categories" id="example-anchor">
        <div className="wc-section">
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/1.jpg" alt="" className="image8" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/2.jpg" alt="" className="image9" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/3.jpg" alt="" className="image10" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/4.jpg" alt="" className="image11" />
          </div>
        </div>
      </section>
      {/* Additional Section 2 End */}

      {/* Additional Section 3 */}
      <section className="work_categories" id="example-anchor">
        <div className="wc-section">
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/1.jpg" alt="" className="image12" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/2.jpg" alt="" className="image13" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/3.jpg" alt="" className="image14" />
          </div>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/4.jpg" alt="" className="image15" />
          </div>
        </div>
      </section>
      {/* Additional Section 3 End */}

      <Testimonial />
      <Team />
    </>
  );
}
