import React, { useEffect, useState } from "react";
import styles from "./LogoSlider.module.css";

const LogoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 10); // Assuming 10 slides in total
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className={styles.slider}>
      <div
        className={styles["slide-track"]}
        style={{
          transform: `translateX(-${currentSlide * 100}%)`, // Assuming each slide takes 100% width
          transition: "transform 0.5s ease", // Smooth sliding transition
        }}
      >
        <div className={`${styles.slide}`}>1</div>
        <div className={`${styles.slide}`}>2</div>
        <div className={`${styles.slide}`}>3</div>
        <div className={`${styles.slide}`}>4</div>
        <div className={`${styles.slide}`}>5</div>
        <div className={`${styles.slide}`}>6</div>
        <div className={`${styles.slide}`}>7</div>
        <div className={`${styles.slide}`}>8</div>
        <div className={`${styles.slide}`}>9</div>
        <div className={`${styles.slide}`}>0</div>
      </div>
    </div>
  );
};

export default LogoSlider;
