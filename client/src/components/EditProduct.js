import React, { useState } from 'react';
import axios from 'axios';

const EditProduct = ({ productId, productName, productDescription, onUpdate }) => {
  const [editedName, setEditedName] = useState(productName || ''); // Kiểm tra nếu productName không tồn tại, sử dụng chuỗi rỗng thay vì undefined
  const [editedDescription, setEditedDescription] = useState(productDescription || ''); // Tương tự với productDescription

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://localhost:7240/api/Product/editproduct/${productId}`, {
        productName: editedName,
        productDescription: editedDescription
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Edit Product</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          value={editedName}
          onChange={handleNameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="productDescription">Product Description:</label>
        <textarea
          className="form-control"
          id="productDescription"
          rows="3"
          value={editedDescription}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditProduct;
