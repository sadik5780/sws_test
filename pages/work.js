import React, { useEffect } from "react";
import Testimonial from "@/components/Testimonial";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";

const work = () => {

  useEffect(() => {
    AOS.init();
  
    const masonry = document.querySelector('.masonry');
    const items = document.querySelectorAll('.item');
  
    const updateMasonry = () => {
      const columnCount = 3; // Set to 3 columns
      masonry.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    };
  
    updateMasonry();
  
    return () => {};
  }, []);
  
  
  return (
    <>
     <Head>
        <title>Our Work | Social Whistles Studio</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="" />
        <link rel="canonical" href="https://socialwhistles.studio/work" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Our Work | Social Whistles Studio" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="https://socialwhistles.studio/work" />
        <meta property="og:site_name" content="Social Whistles Studio Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:label1" content="Est. reading time" />
        <meta name="twitter:data1" content="1 minute" />
      </Head>
      <div className="workPage">
        <div className="masonry">
          <div className="item" >
            <img src="../images/artStills/1.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Ajio%20x%20Attico%20x%20AP.mp4?alt=media&token=6aaeecd4-be6e-4aaf-8b3c-4469a3768bda" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/2.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Anjali%20Reel.mp4?alt=media&token=e11ad427-7cbc-4b77-ab49-85899bf7bf84" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/3.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/BTS%20Full.mp4?alt=media&token=05e30588-bbf4-4e0e-adc6-bd85c955dfe5" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/4.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Bird%20Eye%20Teaser%201.mp4?alt=media&token=5e4044af-7836-4e4e-96b4-ac5d6c802725" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/5.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Bird%20Eye%20Teaser%202.mp4?alt=media&token=0b59f9de-66f5-4915-85c7-d689aa2472cb" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/6.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Coming%20Soon%20Asset%209%2016.mp4?alt=media&token=958fdc12-c062-475a-b4f6-04ac7bf627df" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/7.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Confetti%20Boomerang%20final%20logo.mp4?alt=media&token=3cae15b7-d56a-4c8a-948e-5763d27145cb" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/8.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Dancing%20Playfully%2015%20Seconder%201-1%20Final(1).mp4?alt=media&token=0f42bd7c-809a-40b0-bf5e-187ba16ee318" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/9.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Dancing%20Playfully%2015%20seconder%209-16.mp4?alt=media&token=0b604fbc-00e8-4781-a98c-8c8843fb4179" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/10.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Hyperlapse.mp4?alt=media&token=bd75a738-7058-496d-97a1-d621a3e6c489" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Intercut%20Arm%20Asset%201-1%202Sk%201.mp4?alt=media&token=01374fe8-0a1e-4c5b-93cb-dbc7e77bf960" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/KA%20Wow%20Fashion%20Reel%20Final.mp4?alt=media&token=fb5df5fe-dff1-4437-9cd6-c31d3ecab681" />
            </video>
          </div>

          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Lyne%20x%20Ananya%20Reel%201.mp4?alt=media&token=d024aac8-a220-47ee-a645-d91252f953ff" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Lyne%20x%20Ananya%20Teaser.mp4?alt=media&token=437edebc-ce16-4eb6-98a0-d6d9b797c297" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Playing%20With%20Cards%20Gif%201%201.mp4?alt=media&token=c7c293e8-1312-4de4-a560-8b77a45d2fd0" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Poker%20Chip%20Gif%209%2016.mp4?alt=media&token=788d239c-ac71-43b1-9109-d2ad2a180943" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Q%20A%20Part%201.mp4?alt=media&token=da176383-a9d0-4824-b306-ebd20084493f" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Reel%202.mp4?alt=media&token=c9dae52c-9696-4bff-a643-5bf756f1246b" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Reel%203.mp4?alt=media&token=3e82c006-8135-4783-870a-a3bc315b7f2e" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/U%20I%20X%20Mouni%20Reel%202.mp4?alt=media&token=6b48e6ca-3fb7-4d64-a17e-0f8e72ae16b5" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Vauthier%20x%20JK%20Reel%201.mp4?alt=media&token=4ee83df2-585d-4ce8-bf0b-2a63d76c5b1e" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Vauthier%20x%20JK%20Reel%202.mp4?alt=media&token=7b112445-1ace-4f60-a661-bdf26278c56f" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Wave%20Asset.mp4?alt=media&token=1b7e5be0-5889-4af9-8117-c607d85b486e" />
            </video>
          </div>
          {/* <div className="item">
            <video autoPlay muted loop>
              <source src="" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="" />
            </video>
          </div> */}
        </div>
      </div>

      <Testimonial />
    </>
  );
};

export default work;





