import React, { useState } from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';
import { addToBasket } from './basketAPI';
import { useNavigate } from 'react-router-dom';

function Product({ id, title, image, price, rating }) {
  const [{ user }, dispatch] = useStateValue(); // Removed unused state
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleButtonClick = () => {
    if (user) {
      dispatch({
        type: 'ADD_TO_BASKET',
        item: { id, title, image, price, rating },
      });
      addToBasket(localStorage.getItem('token'), id)
  
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p> // Added key
            ))}
        </div>
      </div>
      <img src={image} alt={title} />
      <button
        className={clicked ? 'product__button clicked' : 'product__button'}
        onClick={ handleButtonClick }
        onAnimationEnd={() => setClicked(false)}
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
