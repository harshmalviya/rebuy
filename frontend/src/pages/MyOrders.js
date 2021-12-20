import React, { useState, useEffect } from "react";
import Spinner from "../components/Utils/Spinner";
import "../styles/MyOrders.css";
function MyOrders() {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}product/buy`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const responseData = await response.json();
      setOrderData(responseData.data.commodities);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="orders">
      <h1 className="orders__heading">My Orders</h1>
      <ul className="orders__list">
        {isLoading && <Spinner black />}
        {orderData.length > 0 ? (
          orderData.map((order) => (
            <li className="orders__item" key={order._id}>
              <div className="orders__item-image">
                <img src={order.pictureOfItem} alt="" />
              </div>
              <div className="orders__item-info">
                <h2>{order.nameOfTheItem}</h2>
                <h2>₹&nbsp;{order.priceListed}</h2>
              </div>
            </li>
          ))
        ) : (
          <h2>No orders, Buy now!</h2>
        )}
      </ul>
    </div>
  );
}

export default MyOrders;
