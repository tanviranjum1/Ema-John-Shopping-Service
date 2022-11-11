import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

// here children is the shipment component.
const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  // location.pathname gives url.

  return loggedInUser.email ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;
