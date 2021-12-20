import React from "react";
import "../../styles/Card.css";
function Card({ data }) {
  return (
    <div className="card">
      <div className="card__image">
        <img src={data.image} alt="" />
      </div>
      <div className="card__content">
        <h1 className="card__heading">{data.name}</h1>
        <p className="card__description">{data.description}</p>
      </div>
    </div>
  );
}

export default Card;
