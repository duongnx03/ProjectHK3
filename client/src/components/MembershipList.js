import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';

const MembershipList = () => {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await axios.get('https://localhost:7240/api/Membership');
      setMemberships(response.data);
    } catch (error) {
      console.error('Error fetching memberships:', error);
      // Xử lý lỗi nếu cần
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={10}>
          <h2 className="text-center mb-4">Membership List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Membership ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Weight</th>
                <th>Registration Date</th>
                <th>Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map(membership => (
                <tr key={membership.membershipId}>
                  <td>{membership.membershipId}</td>
                  <td>{membership.customerName}</td>
                  <td>{membership.email}</td>
                  <td>{membership.phone}</td>
                  <td>{membership.weight}</td>
                  <td>{new Date(membership.dateReigsterMembership).toLocaleDateString()}</td>
                  <td>{new Date(membership.expirationDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default MembershipList;
