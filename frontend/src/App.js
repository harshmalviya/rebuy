import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import "./App.css";
import Header from "./components/Layout/Header/Header";
import AddProduct from "./pages/AddProduct";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails";
import AuthContext from "./store/Auth-Context";
function App() {
  let routes;
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("token")) ctx.checkAuth();
  }, []);

  if (ctx.isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/product/:id" exact>
          <ProductDetails />
        </Route>
        <Route path="/addProduct" exact>
          <AddProduct />
        </Route>
        <Route path="/myAccount" exact>
          <MyAccount />
        </Route>
        <Route path="/myOrders" exact>
          <MyOrders />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <>
      <Router>
        <Header />
        <main>{routes}</main>
      </Router>
    </>
  );
}

export default App;
