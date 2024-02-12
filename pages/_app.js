import React, { useEffect } from "react";
import Layout from "@/components/Layout"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/custom.css";
import "@/styles/header.scss";
import "@/styles/loader.css";
import "@/styles/responsive.css";
import "@/styles/testimonial.css";
import "@/styles/team.scss";
import "@/styles/frame.css";
import "@/styles/work.css";
import Lenis from '@studio-freight/lenis'


export default function App({ Component, pageProps }) {

  useEffect(() => { 
   window.onscroll = function (e) {
       let topScrollY = this.scrollY;
       if (topScrollY > 50) { 
           document.querySelector(".back-top-btn").classList.add("back-top-btn-fixed");
       } else { 
           document.querySelector(".back-top-btn").classList.remove("back-top-btn-fixed");
       }
   };
});

  return (
    <> 
      <Layout>
        <Component {...pageProps} />
        
      </Layout>
    </>
  );
}
