import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import "./styles/index.scss";
import store from "./store/store";

const root = ReactDOM.createRoot(
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
