import React from "react";

const Cart = (props) => {
  const cart = props.cart;
  // app1 : total price finding
  // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);

  // app2:
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    totalPrice += product.price * product.quantity;
  }

  let shipping = 0;
  if (totalPrice > 35) {
    shipping = 0;
  } else if (totalPrice > 15) {
    shipping = 4.99;
  } else if (totalPrice > 0) {
    shipping = 12.99;
  }

  const tax = Math.round(totalPrice / 10);

  const grandTotal = totalPrice + shipping + Number(tax);

  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  return (
    <div>
      <h4>Order Summary</h4>
      <p> Items Ordered:{cart.length}</p>
      <p> Product Price: {formatNumber(totalPrice)}</p>
      <p>
        <small>Shipping Cost: {shipping}</small>
      </p>
      <p>
        <small>Tax + VAT: {formatNumber(tax)}</small>
      </p>
      <p>Total Price: {formatNumber(grandTotal)}</p>
      {props.children}
    </div>
  );
};

export default Cart;
