import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductCard.css'; // fixed filename casing
import { AddToCart } from './store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Veg() {
  const vegItems = useSelector((state) => state.products.veg);
  const dispatch = useDispatch();

  const priceRanges = [
    { value: "rs 1 to rs 50", min: 1, max: 50 },
    { value: "rs 50 to rs 100", min: 51, max: 100 },
    { value: "rs 100 to rs 150", min: 101, max: 150 },
    { value: "rs 150 to rs 200", min: 151, max: 200 },
    { value: "rs 200 to rs 250", min: 201, max: 250 },
    { value: "rs 250 to rs 300", min: 251, max: 300 },
  ];

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleCheckboxChange = (selectedRange) => {
    if (selectedRanges.includes(selectedRange)) {
      const updated = selectedRanges.filter(r => r !== selectedRange);
      setSelectedRanges(updated);
    } else {
      const updated = [...selectedRanges, selectedRange];
      setSelectedRanges(updated);
    }
    setCurrentPage(1); // reset to first page on filter change
  };

  const activeRanges = priceRanges.filter(range =>
    selectedRanges.includes(range.value)
  );

  const filteredProducts = selectedRanges.length === 0
    ? vegItems
    : vegItems.filter(product =>
        activeRanges.some(range => product.price >= range.min && product.price <= range.max)
      );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="veg-container">
      <h1 className="veg-title">Fresh Vegetables</h1>

      <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilters && (
        <div className="filter-section">
          {priceRanges.map(range => (
            <label key={range.value} className="filter-label">
              <input
                type="checkbox"
                checked={selectedRanges.includes(range.value)}
                onChange={() => handleCheckboxChange(range.value)}
              />
              {range.value}
            </label>
          ))}
        </div>
      )}

      <ul className="veg-list">
        {currentItems.map((product, index) => (
          <li key={index} className="veg-item">
            <img src={product.Image} alt={product.name} className="veg-item-img" />
            <div className="veg-item-details">
              <span className="veg-item-name">{product.name}</span>
              <p className="veg-item-price">${product.price.toFixed(2)}</p>
            </div>
            <button
              className="add-to-cart-btn"
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
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
}

export default Veg;
