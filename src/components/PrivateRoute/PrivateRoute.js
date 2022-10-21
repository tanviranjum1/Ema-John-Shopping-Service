import React, { Children } from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

// here children is the shipment component.
const PrivateRoute = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { rest } = useLocation();
  console.log({ rest });
  //   navigate("/shipment");

  return loggedInUser.email ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: rest }} replace />
  );
};

export default PrivateRoute;
