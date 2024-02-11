import React, { useEffect, useState } from "react";
import styles from "./FilmCountdown.module.css";

const Loader = ({ onFinish }) => {
  const [showCountdown, setShowCountdown] = useState(true);
  const [count, setCount] = useState(3); 
  
  
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 0);

      return () => clearTimeout(timer); // Cleanup on component unmount
    } else {
      setShowCountdown(false);
      if (onFinish) {
        onFinish();
      }
    }
  }, [count, onFinish]);

  return (
    <>
      {/* {showCountdown && (
        <div className={styles.body}>
          <div className={styles.screen}></div>
          <div className={styles.lines}></div>
          <div className={styles.number}>{count}</div>
        </div>
      )} */}
      Loading
    </>
  );
};

export default Loader;
