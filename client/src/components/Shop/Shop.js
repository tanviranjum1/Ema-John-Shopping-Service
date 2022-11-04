import React, { useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  // console.log(fakeData);

  // not gonna need fakedata anymore to load data.
  // get first 10 only.
  // const first10 = fakeData.slice(0, 10);
  //const [products, setProducts] = useState(first10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  //loading data from db.
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // run the useEffect when product changes.
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    console.log(products, productKeys);

    // vers1
    // if (products.length > 0) {
    //   const previousCart = productKeys.map((existingKey) => {
    //     const product = products.find((pd) => pd.key === existingKey);
    //     product.quantity = savedCart[existingKey];
    //     return product;
    //   });
    //   setCart(previousCart);
    // }

    fetch("http://localhost:5000/productByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCart(data);
      });
  }, []);

  const handleAddProduct = (product) => {
    // console.log("Product added", product);
    const toBeAddedKey = product.key;
    console.log(cart);

    const sameProduct = cart.find((cd) => {
      return cd.key === toBeAddedKey;
    });
    let count = 1;
    let newCart;

    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        {products.map((pd) => (
          <Product
            handleAddProduct={handleAddProduct}
            showAddToCart={true}
            product={pd}
            key={pd.key}
          />
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
