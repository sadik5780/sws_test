import React from "react";
import Testimonial from "@/components/Testimonial";

const work = () => {
  return (
    <>
      <div className="workPage">
        <div className="masonry">
          <div className="item">
            <img src="../images/artStills/1.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/U%20I%20X%20Mouni%20Reel%202.mp4?alt=media&token=6b48e6ca-3fb7-4d64-a17e-0f8e72ae16b5" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/2.jpg" />
          </div>
          <div className="item">
            <img src="../images/artStills/3.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Vauthier%20x%20JK%20Reel%202.mp4?alt=media&token=7b112445-1ace-4f60-a661-bdf26278c56f" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/4.jpg" />
          </div>
          <div className="item">
            <img src="../images/artStills/5.jpg" />
          </div>
          <div className="item">
            <img src="../images/artStills/6.jpg" />
          </div>
          <div className="item">
            <img src="../images/artStills/7.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Bird%20Eye%20Teaser%201.mp4?alt=media&token=5e4044af-7836-4e4e-96b4-ac5d6c802725" />
            </video>
          </div>
          <div className="item">
            <img src="../images/artStills/8.jpg" />
          </div>
          <div className="item">
            <img src="../images/artStills/9.jpg" />
          </div>
          <div className="item">
            <img src="../images/artStills/10.jpg" />
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Coming%20Soon%20Asset%209%2016.mp4?alt=media&token=958fdc12-c062-475a-b4f6-04ac7bf627df" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/BTS%20Full.mp4?alt=media&token=05e30588-bbf4-4e0e-adc6-bd85c955dfe5" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Dancing%20Playfully%2015%20seconder%2016-9%20(High%20res%20logo).mp4?alt=media&token=ee7849d7-c952-4c00-baf3-92016cc97c6f" />
            </video>
          </div>

          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Lyne%20x%20Ananya%20Reel%201.mp4?alt=media&token=d024aac8-a220-47ee-a645-d91252f953ff" />
            </video>
          </div>
          <div className="item">
            <video autoPlay muted loop>
              <source src="https://firebasestorage.googleapis.com/v0/b/swsvideodb.appspot.com/o/Ajio%20x%20Attico%20x%20AP.mp4?alt=media&token=6aaeecd4-be6e-4aaf-8b3c-4469a3768bda" />
            </video>
          </div>
          <div className="item">
            <audio controls>
              <source src="horse.ogg" type="audio/ogg" />
              <source src="../audio/loader.mpeg" type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </div>

      <Testimonial />
    </>
  );
};

export default work;
