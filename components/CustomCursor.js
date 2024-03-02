import React, { useState, useEffect } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      const onMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
  
      document.addEventListener('mousemove', onMouseMove);
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
      };
    }, []);

  return (
    <div className={styles.cursor} style={{ left: position.x, top: position.y }}>
      {/* Your cursor content */}
    </div>
  )
}

export default CustomCursor