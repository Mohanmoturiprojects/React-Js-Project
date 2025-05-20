import React from 'react';
import './Contact.css';

function ContactUs() {
  return (
    <div className="contact-us container mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-4">
        We'd love to hear from you! Please feel free to reach out to us with any questions, feedback, or concerns.
      </p>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Address</h2>
          <p className="text-lg">123, Example Street, Example City, Example State, 12345</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Phone</h2>
          <p className="text-lg">+91 1234567890</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Email</h2>
          <p className="text-lg">support@myzeptoapp.com</p>
        </div>
      </div>
      <form className="contact-form mb-4">
        <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="name">Name</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg" type="text" id="name" name="name" />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="email">Email</label>
          <input className="w-full p-2 border border-gray-300 rounded-lg" type="email" id="email" name="email" />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="message">Message</label>
          <textarea className="w-full p-2 border border-gray-300 rounded-lg" id="message" name="message"></textarea>
        </div>
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg" type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactUs;