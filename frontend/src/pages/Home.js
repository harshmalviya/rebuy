import React, { useEffect, useState } from "react";
import ProductGrid from "../components/home/ProductGrid";
import { useContext } from "react";
import AuthContext from "../store/Auth-Context";
import Spinner from "../components/Utils/Spinner";
import "../styles/Home.css";
import Hero from "../components/home/Hero";

function Home() {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("User");
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}product/browse`
      );
      const data = await response.json();
      setData(data.data.commodities);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (ctx.userData) {
      setName(ctx.userData.name);
    }
  }, [ctx.userData]);
  return (
    <div className="home">
      <Hero />
      <h1 className="home__heading">Hi {name}! Browse products here...</h1>
      {isLoading && <Spinner black />}
      {data.length > 0 && <ProductGrid data={data} />}
    </div>
  );
}

export default Home;
