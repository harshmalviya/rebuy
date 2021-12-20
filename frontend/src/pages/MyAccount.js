import React, { useState, useEffect } from "react";
import ProductGrid from "../components/home/ProductGrid";
import Spinner from "../components/Utils/Spinner";
import "../styles/MyAccount.css";

function MyAccount() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}auth/getMe`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const responseData = await response.json();
      setUserData(responseData.data.user);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="account">
      <h1 className="account__heading">My Account</h1>
      {isLoading && <Spinner black />}
      {userData && (
        <>
          <div className="basic__details">
            <div className="account__image">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt=""
              />
            </div>
            <div className="account__info">
              <h2>Name: {userData.name}</h2>
              <h2>Email: {userData.email}</h2>
            </div>
          </div>
          <div className="account__products">
            <h1>Items on Sale:</h1>
            {userData.itemsToSell.length > 0 ? (
              <ProductGrid data={userData.itemsToSell} />
            ) : (
              <p>You don't have any items on sale!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MyAccount;
