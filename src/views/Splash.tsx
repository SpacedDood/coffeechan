import { useState, useEffect } from 'react';
import SwishButton from '../components/SwishButton';
import CoffeeComp from '../components/CoffeeComp/coffeeComp';
import coffeeImg from '/src/assets/coffee.png';

type Status = 'start' | 'movejug' | 'brewbeans' | 'brew' | 'coffeeDone';

export default function Splash() {
  const [status, setStatus] = useState<Status>('start');
  const [received, setReceived] = useState<string>('');
  const [duration, setDuration] = useState<number>(10);
  const [durationTotal, setDurationTotal] = useState<number>(10);
  const [coffeeButton, setCoffeeButton] = useState<boolean>(false);

  // Manage countdown timer and status changes
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (status === 'movejug') {
      timer = setTimeout(() => setStatus('brewbeans'), 1000);
    } else if (status === 'brewbeans') {
      timer = setTimeout(() => setStatus('brew'), 3000);
    } else if (status === 'brew') {
      setDurationTotal(duration);

      // Countdown logic during "brew" phase
      const intervalId = setInterval(() => {
        setDuration((prevDuration) => {
          console.log(prevDuration);
          if (prevDuration > 0) {
            return prevDuration - 1;
          } else {
            clearInterval(intervalId); // Stop interval when countdown ends
            timer = setTimeout(() => {
              setStatus('coffeeDone');
              setCoffeeButton(!coffeeButton);
            }, 2000);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(intervalId); // Clean up interval on phase change or unmount
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [status]);

  // Toggle coffee button and reset state if stopped
  function toggleCoffeeButton() {
    setCoffeeButton(!coffeeButton);
    if (!coffeeButton) {
      setStatus('movejug');
      setDuration(10);
      setDurationTotal(10);
    } else {
      setStatus('start');
    }
  }

  // Mock fetch request
  function sendRequest() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: 180 }),
    };
    fetch('http://localhost/run', requestOptions)
      .then((response) => response.json())
      .then((data) => setReceived(data.response));
  }

  return (
    <div className={status}>
      <p>{status}</p>
      <p>{received}</p>
      <CoffeeComp
        active={coffeeButton}
        status={status}
        percent={Math.floor(100 - (duration / durationTotal) * 100)}
        duration={duration}
      />
      <div className="desc">
        <h2>Welcome Dood!</h2>
        <p>
          Coffee-chan is ready to brew your perfect cup. Tap below to start, and
          let's get that coffee magic going!
        </p>
      </div>
      <SwishButton
        active={coffeeButton}
        toggle={toggleCoffeeButton}
        inactiveText="Make Me Coffee"
        activeText="Stop brewing"
        iconText={<img src={coffeeImg} alt="coffee" />}
      />
      <br />
    </div>
  );
}
