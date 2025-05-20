import React from 'react';
import './About.css';

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      
      <p>
        Welcome to <span>My Zepto App</span>, inspired by Zepto's innovative approach to grocery delivery.
        Our mission is to provide <span>fast</span>, <span>reliable</span>, and <span>convenient</span> shopping experiences to our customers.
      </p>
      
      <p>
        With a wide range of products and a focus on <span>quality</span>, we strive to exceed your expectations. Our team is dedicated
        to ensuring that every order is delivered <span>promptly</span> and <span>efficiently</span>.
      </p>

      <h2>Our Values</h2>
      <ul>
        <li><span>Customer satisfaction</span></li>
        <li><span>Quality products</span></li>
        <li><span>Efficient logistics</span></li>
      </ul>

      <h2>Our Mission</h2>
      <p>
        To revolutionize the way people shop for groceries and essentials by providing a <span>fast</span>, <span>reliable</span>, and <span>convenient</span> service.
      </p>
    </div>
  );
}

export default AboutUs;
