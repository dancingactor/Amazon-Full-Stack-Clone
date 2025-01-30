import React from 'react';
import './Order.css';
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";


function Order({ order }) {
  const navigate = useNavigate();
  if (!order || !order.data) {
    return (
      <div className='order empty'>
        <img
          className='order_ad'
          src="https://a.media-amazon.com/images/G/01/GiftCards/2025/Q1/VX-2664/BAU/GCLP_Hero-Desktop-EN-1_3000x600-1._SX3000_QL85_.jpg"
          alt="ad"
        />
        
        
        <h2>You have no orders yet.</h2>
        <p>Start shopping now and your orders will appear here!</p>
        <button className="order__shopButton" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  } 

  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item, index) => (
        <CheckoutProduct
          key={index} // Added key prop
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <NumericFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
