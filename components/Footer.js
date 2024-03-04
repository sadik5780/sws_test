import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="contact-info">
        <h1>Get In Touch</h1>

        <div className="cont_email">
          <p>Email:</p>
          <a href="mailto:client@socialwhistles.studio">
            client@socialwhistles.studio
          </a>
          <br />
          <a href="mailto:ab@socialwhistles.studio">ab@socialwhistles.studio</a>
        </div>

        <div className="cont_phone">
          <p>Contact Number: </p>
          <a href="tel:+91 98673 37153">+91 98673 37153 </a>
        </div>

        <div className="social-icons">
          <p>Insta: </p>
          <a
            href="https://www.instagram.com/abhishek4reel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            @abhisehk4reel
          </a>
          <br />
          <a
            href="https://www.instagram.com/socialwhistlesstudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            @socialwhistlesstudio
          </a>
        </div>

      </div>
      <button className="back-top-btn" onClick={scrollToTop}></button>
    </>
  );
}
