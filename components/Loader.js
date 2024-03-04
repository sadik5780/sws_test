import React, { useEffect, useState } from "react";
import styles from "./FilmCountdown.module.css";

const Loader = ({ onFinish }) => {
  const [interactionPrompt, setInteractionPrompt] = useState(true);

  useEffect(() => {
    const audio = new Audio('../audio/loader.mpeg'); // Adjust the path to your MP3 file

    const handleEnded = () => {
      if (onFinish) {
        onFinish();
      }
    };

    audio.addEventListener('ended', handleEnded);

    const playAudio = async () => {
      try {
        // Display interaction prompt
        setInteractionPrompt(true);

        // Wait for user interaction (click) to start playing music
        await new Promise(resolve => {
          document.body.addEventListener('click', () => {
            resolve();
          }, { once: true });
        });

        // Hide interaction prompt
        setInteractionPrompt(false);

        // Start playing music after user interaction
        audio.play();

        // Get the duration of the audio
        const audioDuration = audio.duration;

        // Gradually decrease the volume during the last 2 seconds
        const fadeOutStart = audioDuration - 2;
        const fadeOutInterval = setInterval(() => {
          const currentTime = audio.currentTime;
          if (currentTime >= fadeOutStart && audio.volume > 0.1) {
            audio.volume -= 0.1;
          } else if (currentTime >= audioDuration) {
            clearInterval(fadeOutInterval);
            audio.pause();
            audio.currentTime = 0; // Reset audio to the beginning
          }
        }, 200); // Adjust the interval as needed
      } catch (error) {
        // Auto-play failed, handle the error here
        console.error("Auto-play failed:", error);
      }
    };

    // Start playing music and initiate fade-out
    playAudio();

    return () => {
      // Clean up event listeners on component unmount
      audio.removeEventListener('ended', handleEnded);
      document.body.removeEventListener('click', () => {});
    };
  }, [onFinish]);

  return (
    <div className={styles.loader}>
      {interactionPrompt && <div className={styles.interactionPrompt}>Click to interact</div>}
      <div className={`${styles.loading} ${styles.loading02}`}>
        <span>S</span>
        <span>&nbsp;</span>
        <span>W</span>
        <span>&nbsp;</span>
        <span>S</span>
      </div>
    </div>
  );
};

export default Loader;
