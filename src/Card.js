import React from 'react'
import "./Card.css";

const Card = ({image, rotate}) => {
  return (
    <div className="Card">
      <img src={image} alt="" style={{transform: `rotate(${rotate}deg)`}}/>
    </div>
  );
};

export default Card;
