import React, { useState } from 'react';
import axios from 'axios';

const OrderMembership = () => {
  const [email, setEmail] = useState('');
  const [weightOrdered, setWeightOrdered] = useState('');

  const handleOrder = async () => {
    try {
      await axios.post(`https://localhost:7240/api/Membership/order?email=${email}&weightOrdered=${weightOrdered}`);
      alert('Membership ordered successfully!');
    } catch (error) {
      console.error('Error ordering membership:', error);
      alert('Failed to order membership.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Order Membership</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight Ordered:</label>
          <input type="number" className="form-control" id="weight" value={weightOrdered} onChange={(e) => setWeightOrdered(e.target.value)} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleOrder}>Order</button>
      </form>
    </div>
  );
};

export default OrderMembership;
