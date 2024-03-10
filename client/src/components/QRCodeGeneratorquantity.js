import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QRCodeGeneratorquantity = () => {
  const { orderQuantityId } = useParams();
  const [orderQuantities, setOrderQuantities] = useState(null);

  useEffect(() => {
    const fetchOrderQuantity = async () => {
      try {
        const response = await axios.get(`https://localhost:7240/api/Orderquantity/${orderQuantityId}`);
        setOrderQuantities(response.data);
      } catch (error) {
        console.error('Error fetching orderquantity:', error);
        // Xử lý lỗi nếu cần
      }
    };

    fetchOrderQuantity();
  }, [orderQuantityId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">QR Code Generator</h2>
      {orderQuantities && (
        <div className="text-center">
          <QRCode value={JSON.stringify(orderQuantities)} />
          <p className="mt-3"><Link to={'/orderquantitylist'}>Back</Link></p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGeneratorquantity;
