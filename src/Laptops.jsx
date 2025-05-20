import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Laptops.css';
import { AddToCart } from './store';

function Laptops() {
  const laptops = useSelector((globalState) => globalState.products.Laptops);
  const dispatch = useDispatch();

  const allLaptops = laptops.map((product, index) => (
    <li key={index} className="laptop-item">
      <img src={product.Image} alt={product.name} className="laptop-image" />
      <div className="laptop-details">
        <span className="laptop-name">{product.name}</span>
        <p className="laptop-price">${product.price.toFixed(2)}</p>
      </div>
      <button
        className="add-to-cart-btn"
        onClick={() => dispatch(AddToCart(product))}
      >
        Add to Cart
      </button>
    </li>
  ));

  return (
    <div className="laptops-container">
      <h1 className="laptops-title">Laptop Models</h1>
      <ul className="laptop-list">{allLaptops}</ul>
    </div>
  );
}

export default Laptops;
