"use client";

import Head from "next/head";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import throttle from 'lodash/throttle';
import Link from "next/link";

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
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    triggerElements.forEach((element, index) => {
      const el = document.querySelector(element);

      if (el) {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top center", // Adjust as needed
            end: "center bottom",
            scrub: 0.5, // Adjust the scrub value
            // markers:true,
            onEnter: () => {
              // Animation when entering the viewport
              gsap.to(el, {
                x: index % 2 === 0 ? 380 : -380,
                ease: "power1.inOut",
              });
            },
            onLeaveBack: () => {
              // Animation when leaving the viewport (scrolling back up)
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
                brand
                <p className="text-container">
                  <span>strategists</span>
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
            <img src="../images/artStills/1.jpg" alt="" className="image1" />
          </div>
          <Link href="/work" className="headline">Brands</Link>
          <div className="wcs_img_wrapper">
            <img src="../images/artStills/2.jpg" alt="" className="image" />
          </div>
        </div>
      </section>

      {/* Work Category Section End */}

      {/* Additional Section 1 */}
      <section className="work_categories" id="example-anchor">
        <div className="wc-section">
          <div className="wcs_img_wrapper">
            <img
              src="../images/artStills/3.jpg"
              alt=""
              className="image3"
              // Add AOS attributes if needed
            />
          </div>
          <Link href="/work" className="headline">Editorials</Link>
          <div className="wcs_img_wrapper">
            <img
              src="../images/artStills/4.jpg"
              alt=""
              className="image2"
              // Add AOS attributes if needed
            />
          </div>
        </div>
      </section>
      {/* Additional Section 1 End */}

      {/* Additional Section 2 */}
      <section className="work_categories" id="example-anchor">
        <div className="wc-section">
          <div className="wcs_img_wrapper">
            <img
              src="../images/artStills/5.jpg"
              alt=""
              className="image5"
              // Add AOS attributes if needed
            />
          </div>
          <Link href="/work" className="headline">Promotions/ <br /> Events</Link>
          <div className="wcs_img_wrapper">
            <img
              src="../images/artStills/6.jpg"
              alt=""
              className="image4"
              // Add AOS attributes if needed
            />
          </div>
        </div>
      </section>
      {/* Additional Section 2 End */}

      {/* Additional Section 3 */}
      <section className="work_categories" id="example-anchor">
        <div className="wc-section">
          <div className="wcs_img_wrapper">
            <img
              src="../images/artStills/7.jpg"
              alt=""
              className="image7"
              // Add AOS attributes if needed
            />
          </div>
          <div className="work_cat_det">

          <Link href="/work" className="headline">Personal</Link>
          </div>
          <div className="wcs_img_wrapper">
            <img
              src="../images/artStills/8.jpg"
              alt=""
              className="image6"
              // Add AOS attributes if needed
            />
          </div>
        </div>
      </section>
      {/* Additional Section 3 End */}

    
    </>
  );
}
