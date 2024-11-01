import React from 'react';
import "./Subtotal.css";
import { NumericFormat } from "react-number-format"; // Updated import
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';

function Subtotal() {
  const navigate = useNavigate(); 
  const [{basket}, dispatch] = useStateValue();
  
  return (
    <div className='subtotal'>
      <NumericFormat // Updated component
        renderText={(value)=> (
            <>
                <p>
                    Subtotal ({basket.length} items):
                    <strong>{`${value}`}</strong>
                </p>
                <small className='subtotal__gift'>
                    <input type="checkbox"/> This order contains a gift
                </small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />

      <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal;
