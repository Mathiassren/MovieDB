import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//pages
import ErrorPage from "./pages/ErrorPage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import MainPage from "./pages/MainPage.jsx";
//route import
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<WelcomePage />}></Route>
      <Route path="mainpage" element={<MainPage />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
