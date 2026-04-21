import React, { useRef } from "react";
import { FaStar } from "react-icons/fa";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "UPSC Aspirant",
    text: "The mock tests are very close to real UPSC level. My accuracy improved a lot.",
  },
  {
    name: "Ananya Verma",
    role: "CSAT Aspirant",
    text: "CSAT practice here is amazing. The analysis helped me understand my weak areas.",
  },
  {
    name: "Karan Mehta",
    role: "UPSC Aspirant",
    text: "Simple UI and powerful insights. This platform really boosted my preparation.",
  },
  {
    name: "Aman Rathore",
    role: "UPSC Aspirant",
    text: "Simple UI and powerful insights. This platform really boosted my preparation.",
  },
];

const Testimonials = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 320;

    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-heading">What Aspirants Say</h2>

      <div className="carousel-wrapper">

        <button className="arrow left" onClick={() => scroll("left")}>
          ‹
        </button>

        <div className="testimonials-grid" ref={scrollRef}>
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="testimonial-text">“{item.text}”</p>

              <div className="user">
                <div className="avatar">{item.name.charAt(0)}</div>
                <div>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        <button className="arrow right" onClick={() => scroll("right")}>
          ›
        </button>

      </div>
    </div>
  );
};

export default Testimonials;