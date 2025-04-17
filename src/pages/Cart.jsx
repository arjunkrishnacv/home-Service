import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  
  useEffect(() => {
    const saved = localStorage.getItem('cartOrder');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
      
        setCartData(parsedData);
      } catch (err) {
        console.log(err);
        
        
      }
    }
  }, []);

  const removeOrder = () => { 
    localStorage.removeItem('cartOrder');
    setCartData(null);
    alert('Order removed from cart!');
  }

  const cartItems = JSON.parse(localStorage.getItem('cartOrders')) || [];


  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4 text-secondary">Cart Summary</h2>
      
      {cartData ? (
        <Row>
          <Col md={8}>
            <ListGroup>
              <ListGroup.Item className="mb-3 shadow-sm rounded">
                <Row>
                  <Col md={2}>
                    {/* Display the image of the selected service */}
                   
                  </Col>
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
                    <Button onClick={removeOrder} variant="danger">Remove</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          
          <Col md={4}>
            <Card className="shadow rounded">
              <Card.Body>
                <h5 className="mb-3">Summary</h5>
                <div className="d-flex justify-content-between">
                  <span>Total</span>
                  <strong>₹{cartData.rate}</strong>
                </div>
                <Button variant="success" className="w-100 mt-3">Proceed to Checkout</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className='text-center'>
          <img width={'200px'} src="https://assets-v2.lottiefiles.com/a/051075ae-1161-11ee-b755-1f6c04b0d17f/GRkHCbLgXB.gif " alt="" />
          <h1 className='text-3xl text-red-600'>Your Cart is Empty!</h1>
        </div>
      )}
    </Container>
  );
};

export default Cart;
