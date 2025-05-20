import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Nonveg.css';
import { AddToCart } from './store';

function Nonveg() {
  const nonvegItems = useSelector((state) => state.products.nonveg);
  const dispatch = useDispatch();

  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter items based on price range
  const filteredItems = nonvegItems.filter(item => item.price <= maxPrice);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleClearFilters = () => {
    setMaxPrice(1000);
    setCurrentPage(1);
  };

  return (
    <div className="nonveg-container">
      <h1 className="nonveg-title">Available Non-Vegetarian Dishes</h1>

      <div className="price-filter">
        <label htmlFor="priceRange" className="price-label">
          Max Price: ₹{maxPrice}
        </label>
        <input
          id="priceRange"
          type="range"
          min="0"
          max="1000"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(+e.target.value);
            setCurrentPage(1); // reset to first page on filter change
          }}
          step="10"
          className="price-slider"
        />
        <button onClick={handleClearFilters} className="clear-button">
          Clear Filters
        </button>
      </div>

      <ul className="nonveg-list">
        {currentItems.map((product, index) => (
          <li key={index} className="nonveg-item">
            <img src={product.Image} alt={product.name} className="nonveg-image" />
            <div className="nonveg-info">
              <h3 className="nonveg-name">{product.name}</h3>
              <p className="nonveg-price">₹{product.price.toFixed(2)}</p>
              <button
                className="add-to-cart-button"
                onClick={() => dispatch(AddToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Nonveg;
