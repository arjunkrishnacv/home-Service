import React, { useState } from 'react';
import { Accordion, Button, Form, FormControl, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import carp from '../assets/carp.jpg';  // Your carpentry image here
import Select from 'react-select';
import { addRequestAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';

const Carpentry = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const serviceOptions = [
    { value: 'Furniture Assembly', label: 'Furniture Assembly', rate: 2500 },
    { value: 'Woodwork Repairs', label: 'Woodwork Repairs', rate: 3000 },
    { value: 'Custom Carpentry', label: 'Custom Carpentry', rate: 5000 },
  ];

  const [orderDetails, setOrderDetails] = useState({
    uname: '',
    address: '',
    date: '',
    time: '',
    description: '',
    serviceType: null,  // Initially null
    rate: 2500, // Default rate for Furniture Assembly
  });

  const handleChange = (selectedOption) => {
    setOrderDetails(prev => ({
      ...prev,
      serviceType: selectedOption, // Update serviceType when user selects an option
      rate: selectedOption?.rate || 2500, // Update rate if a service is selected
    }));
  };

  const handleUpload = () => {
    // Ensure rate is being stored in localStorage
    const orderWithRate = {
      ...orderDetails,
      rate: orderDetails.serviceType ? orderDetails.serviceType.rate : 2500
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
            <h1 className="fw-bold"><span className='text-success'>"Expert Carpentry Services"</span> - Crafting Your Home with Precision!</h1>
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
                        <strong>Service Scope</strong> - Our carpentry services include furniture assembly, woodwork repairs, and custom carpentry.
                      </li>
                      <li>
                        <strong>Customer Responsibilities</strong> - Ensure access to the premises and secure any valuables before the service begins.
                      </li>
                      <li>
                        <strong>Liability</strong> - We are not responsible for pre-existing damages or damaged furniture.
                      </li>
                      <li>
                        <strong>Payment</strong> - Full payment is required upon service completion. No refunds for completed services.
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
            <img width={'80%'} className="mt-5 ms-5 shadow rounded-3" src={carp} alt="" />
          </div>
          <div className="mt-5">
            <h3 className="fw-bold">How it Works</h3>
            <p>Our carpentry services are designed to provide high-quality and durable solutions for your home:</p>
            <p>
              Whether you need furniture assembled, woodwork repairs, or custom carpentry services, our expert craftsmen will ensure precision and quality. Choose the service you need, pick a time that works for you, and our team will arrive on time to get the job done.
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

export default Carpentry;
