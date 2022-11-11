import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, key, price } = props.product;
  //   console.log(props);
  const reviewItemStyle = {
    borderBottom: "1px solid black",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "20px",
  };

  return (
    <div className="review-item" style={reviewItemStyle}>
      <h4 className="product-name">{name}</h4>
      <p>Quantity: {quantity}</p>
      <p>
        <small>${price}</small>
      </p>
      <br />
      <button
        className="main-button"
        onClick={() => props.handleRemoveProduct(key)}
      >
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
