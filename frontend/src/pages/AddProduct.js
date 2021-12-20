import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../components/Utils/Spinner";
import "../styles/AddProduct.css";
function AddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const category = categoryRef.current.value;
    const image = imageRef.current.value;
    const body = {
      nameOfTheItem: name,
      category,
      priceListed: price,
      pictureOfItem: image
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}product/sell`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(body)
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(responseData.message.split(":")[2]);
      }
      if (responseData.status === "success") {
        setIsLoading(false);
        alert("Product added successfully");
        history.push("/");
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="product__form">
      <h1 className="product__form-heading">Add a product</h1>
      <form className="product__form-form" onSubmit={handleFormSubmit}>
        <div className="product__form-input">
          <label htmlFor="name">Name of the Item</label>
          <input type="text" id="name" ref={nameRef} required />
        </div>
        <div className="product__form-input">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" ref={categoryRef} required>
            <option value="vehicle">Vehicle</option>
            <option value="music">Music</option>
            <option value="electronics">Electronics</option>
            <option value="mobile">Mobile Phone</option>
            <option value="books">Books</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>
        <div className="product__form-input">
          <label htmlFor="price">Expected Price</label>
          <input type="number" id="price" ref={priceRef} required />
        </div>
        <div className="product__form-input">
          <label htmlFor="picture">Image</label>
          <input type="url" id="picture" ref={imageRef} required />
        </div>
        <div className="product__form-actions">
          <button className="product__form-button">
            {isLoading ? <Spinner /> : "Add Product"}
          </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AddProduct;
