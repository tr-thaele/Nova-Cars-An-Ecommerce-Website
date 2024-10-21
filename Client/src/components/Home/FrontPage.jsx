import { useState } from "react";
import { Link } from "react-router-dom";

const FrontPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "5.5.png",
    "1.1.png", 
    "2.2.png", 
    "3.3.png", 
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="front">
      <img className="back" src="back_n.png" alt="" />
      <div className="front-child1">
        <h1>Africa Engineering and Manufacturing</h1>
        <button className="order">
          <a href="#booking">Book now</a>
        </button>
        <button className="view">
          <Link to="/vehicles">View Trucks</Link>
        </button>
      </div>
      <div className="front-child2">
      <div className="slider-container"> {/* New container */}
          <div className="slider">
            <button className="slider-arrow left" onClick={prevSlide}>
              &#10094; {/* Left arrow */}
            </button>
            <img
              className="car"
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
            />
            <button className="slider-arrow right" onClick={nextSlide}>
              &#10095; {/* Right arrow */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
