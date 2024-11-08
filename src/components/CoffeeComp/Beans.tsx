import React, { useEffect, useState } from 'react';

import './beans.css';

interface BeanPosition {
  randomLeft: number;
  randomTop: number;
  randomRotation: number;
  randomBean: number;
}

interface BeansProps {
  running: boolean; // This prop indicates if the animation should be active
}

const Beans: React.FC<BeansProps> = (props) => {
  const noBeans = Array.from({ length: 10 });
  const isActive = props.running;

  // State to hold the positions and rotations of the beans
  const [beanPositions, setBeanPositions] = useState<BeanPosition[]>([]);

  // Function to generate random positions
  const generateRandomPositions = (): BeanPosition[] => {
    return noBeans.map(() => {
      const randomLeft = 20 + Math.random() * 40; // Random left position between 20% and 60%
      const randomTop = -150 + Math.random() * 40; // Initial top position above the view
      const randomRotation = Math.random() * 360; // Random rotation between 0 and 360 degrees
      const randomBean = Math.floor(Math.random() * 2) + 1; // Random bean type (1 or 2)
      return { randomLeft, randomTop, randomRotation, randomBean };
    });
  };

  useEffect(() => {
    // Set initial positions on mount
    if (beanPositions.length === 0) {
      setBeanPositions(generateRandomPositions());
    }

    // Generate new positions when isActive changes to true
    if (isActive) {
      const newPositions = beanPositions.map((_, index) => {
        const randomLeft = 20 + Math.random() * 40; // Random left position between 20% and 60%
        const randomTop = 700 + Math.random() * 500; // Random top position between 500px and 1000px when active
        const randomRotation = Math.random() * 360; // Random rotation
        const randomBean = (index % 2) + 1; // Keep alternating between bean types
        return { randomLeft, randomTop, randomRotation, randomBean };
      });
      setBeanPositions(newPositions);
    } else {
      setBeanPositions(generateRandomPositions());
    }
  }, [isActive, beanPositions.length]); // Run when `isActive` or on mount

  const [beanContConfig, setbeanContConfig] = useState([0, 0]);

  return (
    <div className={isActive ? 'beans active' : 'beans'}>
      {beanPositions.map((position, index) => (
        <img
          key={index}
          className="bean"
          src={`/src/components/CoffeeComp/svg/coffeeBean${position.randomBean}.svg`} // Adjust the path as needed
          style={{
            left: `${position.randomLeft}%`,
            top: `${position.randomTop}px`,
            transform: `rotate(${position.randomRotation}deg)`,
            transitionDelay: `${Math.random() * 1}s`, // Random delay for staggered fall
          }}
          alt="Bean"
        />
      ))}
    </div>
  );
};

export default Beans;
