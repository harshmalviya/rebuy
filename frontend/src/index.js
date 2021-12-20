import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./store/Auth-Context";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);