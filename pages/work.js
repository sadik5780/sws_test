import React from "react";
import Testimonial from "@/components/Testimonial";

const work = () => {
  return (
    <>
    <div className="workPage">
      <div class="flexbox">
        <div class="item">
          <img src="https://unsplash.it/600/400?random" />
        </div>
        <div class="item">
          <img src="https://unsplash.it/600/600?random" />
        </div>
        <div class="item">
          <img src="https://unsplash.it/720/460?random" />
        </div>
        <div class="item">
          <img src="https://unsplash.it/800/400?random" />
        </div>
        <div class="item">
          <img src="https://unsplash.it/480/700?random" />
        </div>
        <div class="item">
          <img src="https://unsplash.it/680/420?random" />
        </div>
        <div class="item">
          <img src="https://unsplash.it/740/480?random" />
        </div>
        <div class="item">
          <img src="https://unsplash.it/840/440?random" />
        </div>
        <div class="item">
          <img src="https://unsplash.it/640/380?random" />
        </div>
        <div class="item">
          <img src="https://unsplash.it/500/680?random" />
        </div>
      </div>
    </div>

    <Testimonial/>
    </>
  );
};

export default work;
