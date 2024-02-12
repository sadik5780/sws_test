import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      };
    return (
        <>
           <div className="contact-info">
        <h1>Contact Information</h1>
        <p>
          Email:{" "}
          <a href="mailto:your.email@example.com">your.email@example.com</a>
        </p>
        <p>
          Contact Number: <a href="tel:+123456789">+123456789</a>
        </p>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/your_instagram_handle"
            target="_blank"
            rel="noopener noreferrer"
          >
            insta
          </a>
        </div>
      </div>
           <button className="back-top-btn" onClick={scrollToTop}></button>
        </>
    );
}
