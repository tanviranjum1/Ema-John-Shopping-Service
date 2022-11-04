import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("form submitted", data);
    const savedCart = getDatabaseCart();
    //s hipment info + order which one + user info take now.
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: data,
      orderTime: new Date(),
    };

    // send it to backend or server.
    fetch("http://localhost:5000/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("Your order has been placed successfully");
        }
      });
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input defaultValue="test" {...register("example")} /> */}

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register("name", { required: true })}
        placeholder="Your Name"
        defaultValue={loggedInUser.name}
      />
      {/* errors will return when field validation fails  */}
      {errors.name && <span className="error">The name is required</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register("email", { required: true })}
        placeholder="Your Email"
        defaultValue={loggedInUser.email}
      />
      {/* errors will return when field validation fails  */}
      {errors.email && <span className="error">The email is required</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register("phone", { required: true })}
        placeholder="Your Phone"
      />
      {/* errors will return when field validation fails  */}
      {errors.phone && <span className="error">The phone is required</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <input
        {...register("address", { required: true })}
        placeholder="Your Address"
      />
      {/* errors will return when field validation fails  */}
      {errors.address && <span className="error">The address is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
