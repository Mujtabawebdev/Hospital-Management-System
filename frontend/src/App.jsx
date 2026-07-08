import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "./shared/context/AppContext.jsx";
import { Navbar, Footer, Bot } from "./import-export/ImportExport.js";
import { appRoutes } from "./routes/index.jsx";

const renderRoute = (route) => (
  <Route key={route.path} path={route.path} element={route.element}>
    {route.children?.map(renderRoute)}
  </Route>
);

function AppShell() {
  const location = useLocation();
  const hidePublicNavbar = [
    "/admin",
    "/doctor",
    "/patient",
    "/appointments",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <AppContext>
      {!hidePublicNavbar && <Navbar />}
      <Routes>
        {appRoutes.map(renderRoute)}
      </Routes>
      <Bot />
      <Footer />
      <ToastContainer position="top-right" />
    </AppContext>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
