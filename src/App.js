import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";

function App() {
  return (
    <div>
      {/* now header will always be available. */}
      <Header />
      <Routes>
        {/* fixed path. */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/review" element={<Review />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route exact path="/" element={<Shop />} />

        {/* have to read dynamic value. product key can be different. it is different for each item clicked. */}
        <Route path="/product/:productKey" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
