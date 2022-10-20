import React from "react";
import { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import happyImage from "../../images/giphy.gif";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    // cart reset / make empty.
    setCart([]);
    setOrderPlaced(true);

    //database clean
    processOrder();
  };

  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  // data load in useEffect. cart data.
  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    //get number of items of cart of each product with product key.

    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      // new property and value added to product object.
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  let thankyou;
  if (orderPlaced) {
    thankyou = <img src={happyImage} alt="" />;
  }

  return (
    <div className="twin-container">
      <div>
        {cart.map((pd) => (
          <ReviewItem
            handleRemoveProduct={handleRemoveProduct}
            key={pd.key}
            product={pd}
          />
        ))}
        {thankyou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
