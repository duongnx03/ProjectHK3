import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import axios from 'axios';

const QRCodeGeneratorweight = () => {
  const { orderWeightId } = useParams();
  const [orderWeights, setOrderWeights] = useState([]);
  useEffect(() => {
    const fetchOrderWeight = async () => {
      try {
        const response = await axios.get(`https://localhost:7240/api/orderWeights/${orderWeightId}`);
        setOrderWeights(response.data);
      } catch (error) {
        console.error('Error fetching orderWeights:', error);
        // Xử lý lỗi nếu cần
      }
    };

    fetchOrderWeight();
  }, [orderWeightId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">QR Code Generator</h2>
      {orderWeights && (
        <div className="text-center">
          <QRCode value={JSON.stringify(orderWeights)} />
          <p className="mt-3">Membership ID: {orderWeights.orderWeightId}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGeneratorweight;
