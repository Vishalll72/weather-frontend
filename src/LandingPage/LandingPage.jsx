import React from "react";
import { Link } from "react-router-dom";
import "../LandingPage/LandingPage.css";
import weatherVideo from "../Assets/weather.mp4";
import weather from '../Assets/weather.png'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <video autoPlay loop muted className="video-background">
        <source src={weatherVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <img src={weather} alt="" width={150}/> <br /> 
        <h2>Welcome to Weatherly!</h2>
        <p>Stay ahead of the weather with accurate predictions.</p>
        <Link to="/home">
          <button className="button"> Check Weather</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
