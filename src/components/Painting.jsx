import React, { useState } from 'react';
import { Accordion, Button, Form, FormControl, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import paint from '../assets/paint.jpg';  // Your painting image here
import Select from 'react-select';
import { addRequestAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';

const Painting = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const serviceOptions = [
    { value: 'Wall Painting', label: 'Wall Painting', rate: 3000 },
    { value: 'Ceiling Painting', label: 'Ceiling Painting', rate: 3500 },
    { value: 'Exterior Painting', label: 'Exterior Painting', rate: 4000 },
  ];

  const [orderDetails, setOrderDetails] = useState({
    uname: '',
    address: '',
    date: '',
    time: '',
    description: '',
    serviceType: null,  // Initially null
    rate: 3000, // Default rate for Wall Painting
  });

  const handleChange = (selectedOption) => {
    setOrderDetails(prev => ({
      ...prev,
      serviceType: selectedOption, // Update serviceType when user selects an option
      rate: selectedOption?.rate || 3000, // Update rate if a service is selected
    }));
  };

  const handleUpload = () => {
    // Ensure rate is being stored in localStorage
    const orderWithRate = {
      ...orderDetails,
      rate: orderDetails.serviceType ? orderDetails.serviceType.rate : 3000
    };

    localStorage.setItem('cartOrder', JSON.stringify(orderWithRate));
    handleClose();
    alert('Added to Cart!');
    navigate('/cart');

    const { uname, address, date, time, description, serviceType, rate } = orderDetails;

    if (uname && address && date && time && description && serviceType && rate) {
      const reqBody = new FormData();
      reqBody.append('uname', uname);
      reqBody.append('address', address);
      reqBody.append('date', date);
      reqBody.append('time', time);
      reqBody.append('description', description);
      reqBody.append('serviceType', serviceType.value);
      reqBody.append('rate', rate); // Ensure rate is included in API request

      const token = sessionStorage.getItem('token');

      const reqHeaders = token
        ? {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        : { 'Content-Type': 'multipart/form-data' };

      addRequestAPI(reqBody, reqHeaders).then((res) => {
        console.log('API Response:', res);
        if (res?.status === 200) {
          // You could also show a success message here
        } else if (res?.status === 406) {
          alert('Order already exists!');
        } else {
          alert('Please login!');
        }
      });
    } else {
      alert('Please fill all the details!');
    }
  };

  return (
    <>
      <div className="container vh-50">
        <div className="row">
          <div className="col-lg-6 mt-5">
            <h1 className="fw-bold"><span className='text-success'>"Color Your World"</span> - Expert Painting Services!</h1>
            <div className="mt-5">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Terms and Conditions</Accordion.Header>
                  <Accordion.Body>
                    <ol>
                      <li>
                        <strong>Booking & Cancellation</strong> - Appointments must be booked in advance. Cancellations should be made at least 24 hours before the scheduled time.
                      </li>
                      <li>
                        <strong>Service Scope</strong> - Our painting services include wall, ceiling, and exterior painting.
                      </li>
                      <li>
                        <strong>Customer Responsibilities</strong> - Ensure access to the area and remove any valuables before the service begins.
                      </li>
                      <li>
                        <strong>Liability</strong> - We are not responsible for pre-existing damage to walls or surfaces.
                      </li>
                      <li>
                        <strong>Payment</strong> - Full payment is required after service completion. No refunds for completed services.
                      </li>
                    </ol>
                    <p>
                      <strong>By booking, you agree to these terms.</strong>
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="d-flex justify-content-end mt-5">
              <Button onClick={handleShow} variant="success fw-bold">
                BOOK NOW
              </Button>
            </div>
          </div>
          <div className="col-lg-6">
            <img width={'80%'} className="mt-5 ms-5 shadow rounded-3" src={paint} alt="" />
          </div>
          <div className="mt-5">
            <h3 className="fw-bold">How it Works</h3>
            <p>Our expert painters provide high-quality services that will transform your home.</p>
            <p>
              Whether it's your walls, ceilings, or the exterior of your house, we ensure a smooth, professional finish. Choose your desired service, and we'll schedule a time that works for you. Our team arrives prepared and ensures the work is done on time.
            </p>
          </div>
        </div>
      </div>

      <Modal centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the Required Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Enter Your Name" className="mb-3">
            <Form.Control onChange={(e) => setOrderDetails({ ...orderDetails, uname: e.target.value })} type="name" placeholder="name" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Enter Your Address" className="mb-3">
            <Form.Control onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })} type="name" placeholder="name" />
          </FloatingLabel>
          <FormControl onChange={(e) => setOrderDetails({ ...orderDetails, date: e.target.value })} type="date" controlId="floatingInput" className="mb-3"></FormControl>
          <FormControl onChange={(e) => setOrderDetails({ ...orderDetails, time: e.target.value })} type="time" controlId="floatingInput" className="mb-3"></FormControl>
          <FloatingLabel controlId="floatingInput" label="Description if any" className="mb-3">
            <Form.Control onChange={(e) => setOrderDetails({ ...orderDetails, description: e.target.value })} type="name" placeholder="name" />
          </FloatingLabel>
          <Select 
            options={serviceOptions} 
            placeholder="Select a service type" 
            value={orderDetails.serviceType} 
            onChange={handleChange} 
          />
          {orderDetails.serviceType && (
            <div className="mt-3 p-2 bg-light rounded">
              <p className="mb-0"><strong>Selected service:</strong> {orderDetails.serviceType.label}</p>
              <p className="mb-0"><strong>Rate:</strong> ₹{orderDetails.serviceType.rate}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpload} variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Painting;
