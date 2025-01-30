import React from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
import { removeFromBasket } from './basketAPI'

function CheckoutProduct({ id, image, title, price, rating }) {
  const [, dispatch] = useStateValue();

  const handleRemoveButton = async () =>  {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id,
    });
    const token = localStorage.getItem('token');
    await removeFromBasket(token, id);
  };

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} alt={title} /> {/* Added alt attribute */}
      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p> // Added key prop
            ))}
        </div>
        <button onClick={ handleRemoveButton }>Remove from Basket</button>

      </div>
    </div>
  );
}

export default CheckoutProduct;
