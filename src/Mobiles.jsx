import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Mobiles.css';
import { AddToCart } from './store';

function Mobiles() {
  const allMobiles = useSelector((state) => state.products.Mobiles);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(allMobiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allMobiles.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mobiles-container">
      <h1 className="mobiles-title">Here all Mobile Models are available</h1>
      <ul className="mobiles-list">
        {currentItems.map((product, index) => (
          <li key={index} className="mobile-item">
            <img src={product.Image} alt={product.name} className="mobile-image" />
            <div className="mobile-info">
              <span className="mobile-name">{product.name}</span>
              <p className="mobile-price">${product.price.toFixed(2)}</p>
            </div>
            <button
              className="add-to-cart-button"
              onClick={() => dispatch(AddToCart(product))}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Mobiles;
