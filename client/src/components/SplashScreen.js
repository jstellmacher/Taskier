import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import taskierImage from '../assets/no_bg_logo.png';
import './SplashScreen.css'; // Import CSS file for additional styles

const SplashScreen = () => {
  const history = useHistory();

  useEffect(() => {
    // Simulate a delay of 5 seconds
    const timer = setTimeout(() => {
      history.push('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="splash-container">
      <div className="pulse-animation">
        <img src={taskierImage} alt="Taskier" className="pulse-image" />
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;
