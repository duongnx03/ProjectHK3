// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import EditProduct from './EditProduct';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('https://localhost:7240/api/Product/getallproduct');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct({
//       productId: product.productId,
//       productName: product.productName,
//       productDescription: product.productDescription
//     });
//   };

//   const handleUpdate = () => {
//     setEditingProduct(null);
//     fetchProducts();
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`https://localhost:7240/api/Product/deleteproduct/${id}`);
//       console.log('Product deleted:', response.data);
//       fetchProducts();
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="my-4">Product List</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Product Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.productId}>
//               <td>{product.productName}</td>
//               <td>{product.productDescription}</td>
//               <td>
//                 <button className="btn btn-primary mr-2" onClick={() => handleEdit(product)}>Edit</button>
//                 <button className="btn btn-danger" onClick={() => handleDelete(product.productId)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {editingProduct && (
//         <EditProduct
//           productId={editingProduct.productId}
//           productName={editingProduct.productName}
//           productDescription={editingProduct.productDescription}
//           onUpdate={handleUpdate}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductList;
