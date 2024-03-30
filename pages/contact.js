import React from "react";
import Testimonial from "@/components/Testimonial";
import Team from "@/components/team";
import Head from "next/head";

const contact = () => {
  return (
    <>
      <Head>
        <title>Reach Us | Social Whistles Studio</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="" />
        <link rel="canonical" href="https://socialwhistles.studio/contact" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Reach Us | Social Whistles Studio" />
        <meta property="og:description" content="" />
        <meta
          property="og:url"
          content="https://socialwhistles.studio/contact"
        />
        <meta
          property="og:site_name"
          content="Social Whistles Studio Contact Info"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:label1" content="Est. reading time" />
        <meta name="twitter:data1" content="1 minute" />
        <link rel="icon" href="#" />
      </Head>
      <Team />
      
    </>
  );
};

export default contact;
