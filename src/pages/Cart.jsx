import React, { createContext, useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, ListGroup, Form } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { removeOrderAPI, updateOrderAPI } from '../../services/allAPI';

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track whether the form is being edited
  const [editedOrder, setEditedOrder] = useState(null); // State for edited order data
  const [username, setUsername] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cartOrder');
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUsername(storedUser);
    }
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setCartData(parsedData);
        setEditedOrder(parsedData); // Initialize edited order with cart data
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const removeOrder = () => {
    const token = sessionStorage.getItem('token');
    const reqHeaders = token
      ? {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      : { 'Content-Type': 'application/json' };

    const reqBody = {
      serviceType: cartData?.serviceType.value,
      uname: cartData?.uname,
    };

    localStorage.removeItem('cartOrder');
    setCartData(null);

    removeOrderAPI(reqBody, reqHeaders)
      .then((res) => {
        console.log('API Response:', res);
        if (res?.status === 200) {
          Swal.fire({
            title: 'Removed!',
            text: 'Order has been removed from your cart.',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        } else if (res?.status === 404) {
          Swal.fire({
            title: 'Order Not Found!',
            text: 'Please check your cart.',
            icon: 'warning',
            confirmButtonColor: '#f39c12',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong.',
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to connect to server.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      });
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable editing
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Disable editing
    setEditedOrder(cartData); // Reset to original cart data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const token = sessionStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await updateOrderAPI(editedOrder, headers); // Call your update API here
      if (response.status === 200) {
        Swal.fire({
          title: 'Updated!',
          text: 'Order has been successfully updated.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        setCartData(editedOrder); // Update cart data on the page
        localStorage.setItem('cartOrder', JSON.stringify(editedOrder)); // Update localStorage
        setIsEditing(false); // Close edit mode
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update the order.',
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4 text-secondary">Cart Summary</h2>

      {cartData ? (
        isEditing ? (
          // Edit Mode: Show editable form
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item className="mb-3 shadow-sm rounded">
                  <Row>
                    <Col md={6}>
                      <h5>Edit Order</h5>
                      <Form>
                        <Form.Group>
                          <Form.Label>Service Type</Form.Label>
                          <Form.Control
                            name="serviceType"
                            value={editedOrder.serviceType?.label || ''}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            name="uname"
                            value={editedOrder.uname || ''}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            name="address"
                            value={editedOrder.address || ''}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            name="date"
                            type="date"
                            value={editedOrder.date || ''}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Time</Form.Label>
                          <Form.Control
                            name="time"
                            type="time"
                            value={editedOrder.time || ''}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            name="description"
                            value={editedOrder.description || ''}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Form>
                      <Button className="mt-3" variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                      </Button>
                      <Button className="mt-3 ms-2" variant="secondary" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        ) : (
          // View Mode: Display cart details
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item className="mb-3 shadow-sm rounded">
                  <Row>
                    <Col md={6}>
                      <h5>{cartData.serviceType?.label}</h5>
                      <p><strong>Name:</strong> {cartData.uname}</p>
                      <p><strong>Address:</strong> {cartData.address}</p>
                      <p><strong>Date:</strong> {cartData.date}</p>
                      <p><strong>Time:</strong> {cartData.time}</p>
                      <p><strong>Description:</strong> {cartData.description}</p>
                      <p><strong>Rate:</strong> ₹{cartData.rate}</p>
                    </Col>
                    <Col md={4} className="d-flex flex-column justify-content-between">
                      <strong>₹{cartData.rate}</strong>
                      <Button className="w-50" onClick={removeOrder} variant="danger">
                        Remove
                      </Button>
                      <Button className="w-50" onClick={handleEditClick} variant="primary">
                        Edit
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        )
      ) : (
        <div className="text-center">
          <img
            width={'220px'}
            src="https://assets-v2.lottiefiles.com/a/051075ae-1161-11ee-b755-1f6c04b0d17f/GRkHCbLgXB.gif"
            alt=""
          />
          <h1 className="text-danger fw-bold fs-4">Your Cart is Empty!</h1>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} transition={Zoom} />
    </Container>
  );
};

export default Cart;
