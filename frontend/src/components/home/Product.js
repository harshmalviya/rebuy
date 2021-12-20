import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Product.css";
function Product({ data }) {
  return (
    <Link to={`product/${data._id}`}>
      <div className="product">
        <div className="product__hover">
          <h1>View more</h1>
        </div>
        <div className="product__image">
          <img src={data.pictureOfItem} alt={data.nameOfTheItem} />
        </div>
        <h1 className="product__name">{data.nameOfTheItem}</h1>
        <div className="product__details">
          <h2>₹&nbsp;{data.priceListed}</h2>
          <h2>{data.category}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Product;
