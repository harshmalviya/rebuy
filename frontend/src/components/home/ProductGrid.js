import React from "react";
import "../../styles/ProductGrid.css";
import Product from "./Product";
function ProductGrid({ data }) {
  return (
    <div className="product__grid">
      {data.map((product, index) => {
        return <Product key={index} data={product} />;
      })}
    </div>
  );
}

export default ProductGrid;
