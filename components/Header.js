import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { links, footerLinks } from "./data";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const [isActive, setisActive] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [navigation, setNavigation] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const closeMenu = () => {
    setisActive(false);
    setIsMobileNavOpen(false);
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    isMobile ? setNavigation(false) : setNavigation(true);
    return () => {};
  }, [isMobile]);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  // Show Hide Header
  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';


  return (
    <>
      <div className={`site-header customnavbar ${isHidden ? "hide" : ""}`}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand" href="/">
              {/* <img
                                src='/images/redbytes_logo.png'
                                alt="SWS Logo"
                            /> */}
              {/* Social Whistle Studio */}
              SWS
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${
                isMobileNavOpen ? "show" : ""
              }`}
              id="navbarSupportedContent"
            >
              <ul className="custom_nav d-flex justify-content-end navbar-nav ms-auto mb-2 mb-lg-0">
                {links.map((link, i) => {
                  const { title, href } = link;
                  return (
                    <li key={`b_${i}`} className="nav-item">
                      <Link
                        href={href}
                        onClick={closeMenu}
                        className={`nav-link ${currentPath === href ? 'active' : ''}`}
                      >
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

function PerspectiveText({ label }) {
  return (
    <div className="perspectiveText">
      {/* <p></p>
      <p>{label}</p> */}
      <img src={label} alt="" />
      <img src={label} alt="" />
    </div>
  );
}
