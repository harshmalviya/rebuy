import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "../components/Utils/Spinner";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const params = useParams();
  const productId = params.id;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buying, setBuying] = useState(false);
  const history = useHistory();

  const fetchProductDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}product/browse/${productId}`
      );
      const responseData = await response.json();
      setIsLoading(false);
      setData(responseData.data.commodity);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handlePurchase = async () => {
    setBuying(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}product/buy/${productId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setBuying(false);
      history.push("/myOrders");
    } catch (error) {
      setBuying(false);
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <Spinner black />}
      <div className="product__detail">
        {data && (
          <>
            <div className="product__detail-image">
              <img src={data.pictureOfItem} alt="" />
            </div>
            <div className="product__detail-info">
              <div className="product__info--top">
                <h1 className="product__name">{data.nameOfTheItem}</h1>
                <p>
                  <i className="fas fa-share"></i>Share
                </p>
              </div>
              <h1 className="product__category">Category: {data.category}</h1>
              <p className="heading">Listed Price</p>
              <h1 className="product__price">₹&nbsp;{data.priceListed}</h1>
              <div className="product__description">
                <h2>Description:</h2>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum sit necessitatibus animi ipsa omnis explicabo,
                  laboriosam dolorem quaerat quidem at, nobis corrupti? Corporis
                  voluptas sit ut minus, quidem nam! Aliquam iste cum excepturi
                  officia, error mollitia ipsa amet voluptatum vero laborum
                  soluta reprehenderit doloremque perspiciatis harum nesciunt
                  odio dolorem consectetur molestiae laboriosam esse debitis!
                  Repudiandae consequuntur illum quis natus repellendus?
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Itaque laborum enim, excepturi doloribus nobis vel magnam
                  voluptatem eaque distinctio, dolores est provident minus sequi
                  minima consequatur blanditiis, modi error iusto.
                </p>
              </div>
              <h1 className="product__user">
                <i className="fas fa-user"></i>Sold by: {data.user.name}
              </h1>
              <div className="cta">
                <button className="btn" onClick={handlePurchase}>
                  {buying ? (
                    <Spinner />
                  ) : (
                    <>
                      <i className="fas fa-shopping-bag"></i>"Buy"
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
