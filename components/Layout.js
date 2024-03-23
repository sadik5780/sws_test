import Header from "./Header";
import Footer from "./Footer";
// import FooterLogo from "./footerlogo";
import Loader from "./Loader";
import { useState } from "react";
import SmoothScrolling from "@/components/SmoothScrolling";
import CustomCursor from "@/components/CustomCursor";

export default function Layout({ children }) {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleCountdownFinish = () => {
    setShowMainContent(true);
  };
  return (
    <>
      {!showMainContent ? (
        <Loader onFinish={handleCountdownFinish} />
      ) : (
        <>
        {/* <CustomCursor activeElements={['.custom-hover-element']}/> */}
          <Header />
          <main id="main-layout">
            <div className="frame">
              <div className="frame__lineW"></div>
              <div className="frame__lineH"></div>
              <div className="frame__cir"></div>
              <div className="frame__lineWrap">
                <div className="frame__corner frame__corner_tl"></div>
                <div className="frame__corner frame__corner_tr"></div>
                <div className="frame__corner frame__corner_bl"></div>
                <div className="frame__corner frame__corner_br"></div>
                <div className="frame__line"></div>
              </div>
              <div className="frame__bottom">
                <div className="text-center frame__bottomCenter">
                  <p className="p2 mp0">
                    3..2..1..
                    <svg
                      width="10"
                      height="26"
                      viewBox="0 0 10 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0L10 0L10 10.3158L5 14L0 10.3158L0 0Z"
                        fill="#F8F8F8"
                      ></path>
                      <path
                        d="M5 18L5 26"
                        stroke="#F8F8F8"
                        strokeWidth="0.71148"
                      ></path>
                    </svg>
                    ..1..2..3
                  </p>
                </div>
              </div>
            </div>
            <div className="noise"></div>
            {/* <SmoothScrolling>{children}</SmoothScrolling> */}
            {children}
          </main>
          <Footer />
          {/* <FooterLogo /> */}
        </>
      )}
    </>
  );
}
