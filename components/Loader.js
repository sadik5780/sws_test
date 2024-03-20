import React, { useEffect, useState } from "react";
import styles from "./FilmCountdown.module.css";

const Loader = ({ onFinish }) => {
  const [interactionPrompt, setInteractionPrompt] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('../audio/loader.mpeg'); // Adjust the path to your MP3 file

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
      }, 5000); // Start fading after 3 seconds
    };

    const fadeOut = () => {
      const initialVolume = audio.volume;
      const fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.1) {
          audio.volume -= 0.1;
        } else {
          clearInterval(fadeOutInterval);
          audio.pause();
          audio.volume = initialVolume; // Reset volume to initial level
          handleEnded();
        }
      }, 200); // Adjust the interval as needed
    };

    // Display interaction prompt and start playing music after user interaction
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
        </div>
      )}
    </div>
  );
};

export default Loader;
