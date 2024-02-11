import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      };
    return (
        <>
           <p>Footer</p>
           <button className="back-top-btn" onClick={scrollToTop}></button>
        </>
    );
}
