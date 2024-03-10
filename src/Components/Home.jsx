import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BangaloreImage from "../Assets/bangalore.jpg";
import ChennaiImage from "../Assets/chennai.jpg";
import NewDelhiImage from "../Assets/newdelhi.jpg";
import LucknowImage from "../Assets/lucknow.jpg";
import MumbaiImage from "../Assets/mumbai.jpg";
import RajasthanImage from "../Assets/rajasthan.webp";
import "../Components/Home.css";
import "../Components/StarBackground.css";

function Home() {
  const starsContainerRef = useRef(null);

  useEffect(() => {
    const generateRandomStar = () => {
      const star = document.createElement("div");
      star.classList.add("star");
      const size = Math.random() * 3;
      const duration = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${duration}s`;
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      star.style.left = `${posX}px`;
      star.style.top = `${posY}px`;
  
      // Check if starsContainerRef.current is not null before appending stars
      if (starsContainerRef.current) {
        starsContainerRef.current.appendChild(star);
      }
  
      // Remove star after animation completes
      setTimeout(() => {
        star.remove();
        generateRandomStar();
      }, duration * 1000);
    };
  
    // Generate initial stars
    for (let i = 0; i < 100; i++) {
      generateRandomStar();
    }
  
    // Ensure stars keep appearing
    const interval = setInterval(() => {
      generateRandomStar();
    }, 3000);
  
    // Clean up on unmount
    return () => clearInterval(interval);
  }, []);
  

  const locations = [
    { name: "Bangalore", image: BangaloreImage },
    { name: "Chennai", image: ChennaiImage },
    { name: "Delhi", image: NewDelhiImage },
    { name: "Lucknow", image: LucknowImage },
    { name: "Mumbai", image: MumbaiImage },
    { name: "Rajasthan", image: RajasthanImage },
  ];

  return (
    <div className="main-component" style={{ zIndex: "-1" }}>
      <div className="select-text">
        <h3>Select a Location</h3>
      </div>
      <div className="select-location">
        {locations.map((location, index) => (
          <Link to={`/location/${location.name.toLowerCase()}`} key={index}>
            <div className="location-container">
              <img src={location.image} alt={location.name} />
              <div class="gradient"></div>
              <div className="location-name">{location.name}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="stars-container" ref={starsContainerRef}></div>
    </div>
  );
}

export default Home;
