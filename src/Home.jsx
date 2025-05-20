import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Homepage.css';

function HomePage() {
  const vegs = useSelector(state => state.products.veg);
  const nonvegs = useSelector(state => state.products.nonveg);
  const mobiles = useSelector(state => state.products.Mobiles);
  const laptops = useSelector(state => state.products.Laptops);

  const categories = [
    { title: "Vegetables", items: vegs },
    { title: "Non-Vegetarian", items: nonvegs },
    { title: "Mobiles", items: mobiles },
    { title: "Laptops", items: laptops }
  ];

  const [currentPage, setCurrentPage] = useState(0); // category index

  const handleNext = () => {
    if (currentPage < categories.length - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const renderProducts = (products) => (
    products.map((product, index) => (
      <div className="product-card" key={index}>
        <img src={product.Image} alt={product.name} className="product-image" />
        <h4 className="product-name">{product.name}</h4>
        <p className="product-price">₹{product.price}</p>
      </div>
    ))
  );

  return (
    <div className="home-container">
      <h2 className="section-title">{categories[currentPage].title}</h2>
      <div className="scroll-container">
        {renderProducts(categories[currentPage].items)}
      </div>

      <div className="home-pagination">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Previous
        </button>
        <span>Page {currentPage + 1} of {categories.length}</span>
        <button onClick={handleNext} disabled={currentPage === categories.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;
