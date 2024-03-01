import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert } from 'react-bootstrap';

function OrderQuantityList() {
  const [orderQuantities, setOrderQuantities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch danh sách lượng đơn hàng từ API endpoint khi component được load
    const fetchOrderQuantities = async () => {
      try {
        const response = await axios.get('https://localhost:7240/api/OrderQuantity/OrderQuantityList');
        setOrderQuantities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order quantities:', error);
        setError('Failed to fetch order quantities. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrderQuantities();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Order Quantity List</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Quantity ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Wash Time</th>
              <th>Time to Finish Washing</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Customer Email</th>
            </tr>
          </thead>
          <tbody>
            {orderQuantities.map((orderQuantity) => (
              <tr key={orderQuantity.orderQuantityId}>
                <td>{orderQuantity.orderQuantityId}</td>
                <td>{orderQuantity.productId}</td>
                <td>{orderQuantity.quantity}</td>
                <td>{new Date(orderQuantity.washTime).toLocaleString()}</td>
                <td>{new Date(orderQuantity.timeToFinishWashing).toLocaleString()}</td>
                <td>{orderQuantity.customerName}</td>
                <td>{orderQuantity.customerPhone}</td>
                <td>{orderQuantity.customerEmail}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderQuantityList;
