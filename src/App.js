import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/NotFound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>Login email:{loggedInUser.email}</h3>
      {/* now header will always be available. */}
      <Header />
      <Routes>
        {/* fixed path. */}
        <Route exact path="/" element={<Shop />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/review" element={<Review />} />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />

        <Route
          path="/shipment"
          element={
            <PrivateRoute>
              <Shipment />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        {/* have to read dynamic value. product key can be different. it is different for each item clicked. */}
        <Route path="/product/:productKey" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Routes>
        <Route path="/shipment" element={<PrivateRoute />}>
          <Route element={<shipment />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;

//  {/*private route to make it not accessible by everyone. */}
//         {/* <PrivateRoute path="/inventory" element={<Inventory />} /> */}
//         {/* privateroute is the route defined. */}
