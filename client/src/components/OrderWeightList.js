import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert } from 'react-bootstrap';

function OrderWeightList() {
  const [orderWeights, setOrderWeights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderWeight = async () => {
      try {
        const response = await axios.get('https://localhost:7240/api/OrderWeight/OrderWeightList');
        setOrderWeights(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order weights:', error);
        setError('Failed to fetch order weights. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrderWeight();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Order Weight List</h1>
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
              <th>Order Weight ID</th>
              <th>Product ID</th>
              <th>Weight</th>
              <th>Wash Time</th>
              <th>Time to Finish Washing</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Customer Email</th>
            </tr>
          </thead>
          <tbody>
            {orderWeights.map((orderWeight) => (
              <tr key={orderWeight.orderWeightId}>
                <td>{orderWeight.orderWeightId}</td>
                <td>{orderWeight.productId}</td>
                <td>{orderWeight.weight}</td>
                <td>{new Date(orderWeight.washTime).toLocaleString()}</td>
                <td>{new Date(orderWeight.timeToFinishWashing).toLocaleString()}</td>
                <td>{orderWeight.customerName}</td>
                <td>{orderWeight.customerPhone}</td>
                <td>{orderWeight.customerEmail}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderWeightList;
