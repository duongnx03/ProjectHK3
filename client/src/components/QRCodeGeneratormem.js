import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import axios from 'axios';

const QRCodeGeneratormem = () => {
  const { membershipId } = useParams();
  const [membership, setMembership] = useState(null);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await axios.get(`https://localhost:7240/api/Membership/${membershipId}`);
        setMembership(response.data);
      } catch (error) {
        console.error('Error fetching membership:', error);
        // Xử lý lỗi nếu cần
      }
    };

    fetchMembership();
  }, [membershipId]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">QR Code Generator</h2>
      {membership && (
        <div className="text-center">
          <QRCode value={JSON.stringify(membership)} />
          <p className="mt-3">Back</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeGeneratormem;
