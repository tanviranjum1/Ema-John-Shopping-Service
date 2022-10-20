import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetail = () => {
  // custom hooks  react router gave us
  // desteructred from object.
  const { productKey } = useParams();
  const product = fakeData.find((pd) => pd.key === productKey);
  console.log(product);

  return (
    <div>
      {/* <h1>{productKey}Product Detail coming soon.</h1> */}
      <Product showAddToCart={false} product={product} />
    </div>
  );
};

export default ProductDetail;
