import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./FilmCountdown.module.css";

const Loader = ({ onFinish }) => {
  const [interactionPrompt, setInteractionPrompt] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('../audio/loader.mpeg');

    const handleEnded = () => {
      setMusicPlaying(false);
      if (onFinish) {
        onFinish();
      }
    };

    const playAudio = () => {
      audio.play();
      setMusicPlaying(true);
      setTimeout(() => {
        fadeOut();
      }, 0); // Fade out after 6 seconds
    };

    const fadeOut = () => {
      const initialVolume = audio.volume;
      const fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.1) {
          audio.volume -= 0.1;
        } else {
          clearInterval(fadeOutInterval);
          audio.pause();
          audio.volume = initialVolume;
          handleEnded();
        }
      }, 200);
    };

    const handleClick = () => {
      setInteractionPrompt(false);
      playAudio();
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [onFinish]);

  return (
    <div className={styles.loader}>
      {interactionPrompt && <div className={styles.interactionPrompt}>Click to interact</div>}
      {!interactionPrompt && musicPlaying && (
        <div className={`${styles.loading} ${styles.loading02}`}>
          <span>S</span>
          <span>&nbsp;</span>
          <span>W</span>
          <span>&nbsp;</span>
          <span>S</span>
          <div className={styles.loadingBar}></div>
        </div>
      )}
    </div>
  );
};

Loader.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default Loader;
