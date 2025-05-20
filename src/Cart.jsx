import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddOrder, ClearCart, DecCart, IncCart, RemoveFromCart } from './store';
import './Cart.css';
import QRCode from 'react-qr-code';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [redirectMessage, setRedirectMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [manualDiscount, setManualDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const couponCodeRef = useRef();
  const emailRef = useRef();
  const [customerEmail, setCustomerEmail] = useState("");

  const handleApplyCoupon = () => {
    const enteredCode = couponCodeRef.current.value.trim().toUpperCase();
    switch (enteredCode) {
      case 'MOHAN10':
        setCouponDiscount(10);
        break;
      case 'MOHAN20':
        setCouponDiscount(20);
        break;
      case 'MOHAN30':
        setCouponDiscount(30);
        break;
      default:
        alert('INVALID COUPON CODE');
        setCouponDiscount(0);
    }
  };

  const calculateTotals = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiscountPercent = manualDiscount + couponDiscount;
    const discountAmount = (total * totalDiscountPercent) / 100;
    const discountedPrice = total - discountAmount;
    const tax = (discountedPrice * 5) / 100;
    const finalAmount = discountedPrice + tax;
    return { total, discountAmount, tax, finalAmount };
  };

  const { total, discountAmount, tax, finalAmount } = calculateTotals();

  const handleCompletePurchase = async () => {
    if (!customerEmail) {
      toast.error("❌ Please enter a valid email address.");
      return;
    }

    try {
      const order_id = 'ORD' + new Date().getTime(); 
      const templateParams = {
        order_id: order_id,
        orders: cartItems.map(item => ({ 
          name: item.name, 
          price: (item.price * item.quantity).toFixed(2), 
          units: item.quantity, 
          item: <img src={item.Image} alt={item.name} className="cart-image" />
        })),
        cost: { 
          shipping: 50, 
          tax: tax.toFixed(2), 
          total: finalAmount.toFixed(2) 
        },
        email: customerEmail
      };

      const response = await emailjs.send('service_u213ou9', 'template_p97gy27', templateParams, '1M9nFDQPFQ8gHJrkc');
      
      if (response.status === 200) {
        toast.success('✅ Order confirmation email sent!');
      } else {
        toast.error('❌ Failed to send confirmation email');
      }

      const purchaseDetails = { 
        id: order_id, 
        items: cartItems, 
        date: new Date().toLocaleString(), 
        totalAmount: finalAmount,
        email: customerEmail 
      };
      dispatch(AddOrder(purchaseDetails));
      toast.success('✅ Order placed successfully!');
      
      setTimeout(() => {
        dispatch(ClearCart());
        setRedirectMessage('🔄 Redirecting to Orders...');
        setTimeout(() => {
          navigate('/Orders');
        }, 2000);
      }, 1000);
    } catch (err) {
      toast.error('❌ Error sending email');
      console.error(err);
    }
  };

  const confirmPayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    if (!paymentConfirmed) {
      alert('Please confirm payment before proceeding.');
      return;
    }
    handleCompletePurchase();
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentConfirmed(false);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title" style={{ color: 'orange' }}>Your Order Is Placed Successfully...</h1>

      {cartItems.length === 0 ? (
        <p className="empty-message" style={{ color: 'red' }}>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.Image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">
                    ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                  </p>
                  <div className="cart-actions">
                    <button className="action-btn" onClick={() => dispatch(IncCart(item))}>+</button>
                    <button className="action-btn" onClick={() => dispatch(DecCart(item))}>-</button>
                    <button className="remove-btn" onClick={() => dispatch(RemoveFromCart(item))}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="summary">
            <h3>Total Price: ₹{total.toFixed(2)}</h3>

            <div className="discount-section">
              <h4>Manual Discount:</h4>
              <div className="discount-buttons">
                <button onClick={() => setManualDiscount(10)}>APPLY10%</button>
                <button onClick={() => setManualDiscount(20)}>APPLY20%</button>
                <button onClick={() => setManualDiscount(30)}>APPLY30%</button>
              </div>

              <h4>Apply Coupon Code:</h4>
              <div className="coupon-row">
                <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" />
                <button onClick={handleApplyCoupon}>Apply Coupon</button>
              </div>

              {couponDiscount > 0 && (
                <p style={{ textAlign: 'center', color: '#2ecc71' }}>
                  {couponDiscount}% coupon discount applied
                </p>
              )}
            </div>

            <h4>Discount: ₹{discountAmount.toFixed(2)}</h4>
            <h4>Tax (5%): ₹{tax.toFixed(2)}</h4>
            <h2 className="final-amount">Final Amount: ₹{finalAmount.toFixed(2)}</h2>

            <div>
              <label className='form-label'>
                Enter your Gmail to receive your order confirmation:
              </label>
              <input
                type='email'
                ref={emailRef}
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className='form-control'
                placeholder='Enter your Email'
              />
            </div>

            <div className="payment-methods">
              <h3>Choose Payment Method</h3>
              <button onClick={() => handlePaymentMethodChange('UPI')}>UPI Payment</button>
              <button onClick={() => handlePaymentMethodChange('Card')}>Credit/Debit Card</button>
              <button onClick={() => handlePaymentMethodChange('Wallet')}>Wallet</button>
            </div>

            {paymentMethod === 'UPI' && (
              <div className="qr-popup">
                <h3>Scan to Pay via UPI</h3>
                <QRCode
                  value={`upi://pay?pa=8247858885@ybl&pn=Lohith%20Cart%20Craze&am=${finalAmount.toFixed(2)}&cu=INR`}
                />
                <p>Scan this QR with any UPI app</p>
                <label>
                  <input
                    type="checkbox"
                    checked={paymentConfirmed}
                    onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  />{' '}
                  I have completed the payment
                </label>
                <button
                  onClick={confirmPayment}
                  className="confirm-btn"
                  disabled={!paymentConfirmed}
                >
                  Complete Order
                </button>
              </div>
            )}

            {paymentMethod === 'Card' && (
              <div className="card-payment">
                <h3>Enter Card Details</h3>
                <input type="text" placeholder="Card Number" maxLength="16" />
                <input type="text" placeholder="Cardholder Name" />
                <input type="text" placeholder="MM/YY" maxLength="5" />
                <input type="text" placeholder="CVV" maxLength="3" />
                <label>
                  <input
                    type="checkbox"
                    checked={paymentConfirmed}
                    onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  />{' '}
                  I confirm payment was successful
                </label>
                <button
                  onClick={confirmPayment}
                  className="confirm-btn"
                  disabled={!paymentConfirmed}
                >
                  Pay ₹{finalAmount.toFixed(2)}
                </button>
              </div>
            )}

            {paymentMethod === 'Wallet' && (
              <div className="wallet-payment">
                <h3>Wallet Payment</h3>
                <select>
                  <option>-- Select Wallet --</option>
                  <option>Paytm</option>
                  <option>PhonePe</option>
                  <option>Amazon Pay</option>
                </select>
                <input type="text" placeholder="Mobile Number" maxLength="10" />
                <label>
                  <input
                    type="checkbox"
                    checked={paymentConfirmed}
                    onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  />{' '}
                  I confirm payment was successful
                </label>
                <button
                  onClick={confirmPayment}
                  className="confirm-btn"
                  disabled={!paymentConfirmed}
                >
                  Pay ₹{finalAmount.toFixed(2)}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
