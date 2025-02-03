import React, { useState } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "./reducer";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  // State for demo purposes
  const [disabled, setDisabled] = useState(true);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    // Demo success handling
    alert("Demo purchase complete! (No real payment processed)");
    dispatch({ type: 'EMPTY_BASKET' });
    navigate("/orders", { replace: true });
  };

  const handleCardChange = (e) => {
    // Simulate validation for demo purposes
    setDisabled(e.empty || e.error);
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
          Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        
        {/* Delivery Address Section - Kept as UI */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>789 React Lane</p>
            <p>Philadelphia, PA</p>
          </div>
        </div>

        {/* Review Items Section - Kept as UI */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review Items and Delivery</h3>
          </div>
          <div className='payment__items'>
            {basket?.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment Section - Keeps CardElement but removes real functionality */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleDemoSubmit}>
              {/* Keep the CardElement for UI */}
              <CardElement
                onChange={handleCardChange}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
              
              <div className='payment__priceContainer'>
                <NumericFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button 
                  type="submit"
                  disabled={disabled}
                  className={`payment__button ${disabled ? 'payment__button--disabled' : ''}`}
                >
                  Buy Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;