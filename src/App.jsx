import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './Home';
import Mobiles from './Mobiles';
import Laptops from './Laptops';
import Veg from './Veg';
import Nonveg from './Nonveg';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Signin from './Signin';
import Notfound from './Notfound';
import Cart from './Cart';
import Orders from './Orders';

import './Styles.css';

function App() {
  const cartObjects = useSelector(globalState => globalState.cart);
  const totalCount = cartObjects.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Header Section */}
        <header className="navbar">
          {/* First Row: Logo, Title, Search Bar, Cart */}
          <div className="navbar-top">
            <div className="logo">🛒</div>
            <h1 className="site-title">Zepto App</h1>
            <input
              type="text"
              placeholder="Search for products..."
              className="search-bar"
            />
            <Link to="/cart" className="cart-icon" style={{color:"red"}}>
              🛍️ Cart ({totalCount})
            </Link>
          </div>

          {/* Second Row: Navigation Buttons (Single Line) */}
          <div className="navbar-bottom">
            <ul className="nav-links nav-row">
              <li><Link to="/home">🏠 Home</Link></li>
              <li><Link to="/aboutus">ℹ️ About</Link></li>
              <li><Link to="/veg">🥦 Veg</Link></li>
              <li><Link to="/nonveg">🍗 Nonveg</Link></li>
              <li><Link to="/mobiles">📱 Mobiles</Link></li>
              <li><Link to="/laptop">💻 Laptop</Link></li>
              <li><Link to="/contactus">📞 Contact</Link></li>
              <li><Link to="/signin">🔑 Signin</Link></li>
              <li><Link to="/orders">📦 Orders</Link></li>
            </ul>
          </div>
        </header>

        {/* Main Content Section */}
        <main className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/veg" element={<Veg />} />
            <Route path="/nonveg" element={<Nonveg />} />
            <Route path="/mobiles" element={<Mobiles />} />
            <Route path="/laptop" element={<Laptops />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/signin" element={<Signin />} />
            <Route  path="/cart" element={<Cart  />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/*" element={<Notfound />} />
          </Routes>
        </main>

        {/* Footer Section */}
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
