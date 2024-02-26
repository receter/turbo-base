import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import store, { reducerManager } from "./store";
import { configureFeatureManager, FeaturesContext } from "./features/index.ts";
import { Provider } from "react-redux";
import App from "./containers/App/index.tsx";

const featureManager = configureFeatureManager(reducerManager, store.dispatch);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FeaturesContext.Provider value={featureManager}>
        <App />
      </FeaturesContext.Provider>
    </Provider>
  </React.StrictMode>,
);
