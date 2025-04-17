import React, { useState } from 'react';
import { Accordion, Button, Form, FormControl, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import tvInstallationImage from '../assets/tvservice.jpg';  // Your TV installation image here
import Select from 'react-select';
import { addRequestAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';

const Tv = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const serviceOptions = [
    { value: 'Basic TV Installation', label: 'Basic TV Installation', rate: 1000 },
    { value: 'Wall Mounting', label: 'Wall Mounting', rate: 1500 },
    { value: 'Soundbar Installation', label: 'Soundbar Installation', rate: 1200 },
  ];

  const [orderDetails, setOrderDetails] = useState({
    uname: '',
    address: '',
    date: '',
    time: '',
    description: '',
    serviceType: null,  // Initially null
    rate: 1000, // Default rate for Basic TV Installation
  });

  const handleChange = (selectedOption) => {
    setOrderDetails(prev => ({
      ...prev,
      serviceType: selectedOption, // Update serviceType when user selects an option
      rate: selectedOption?.rate || 1000, // Update rate if a service is selected
    }));
  };

  const handleUpload = () => {
    // Ensure rate is being stored in localStorage
    const orderWithRate = {
      ...orderDetails,
      rate: orderDetails.serviceType ? orderDetails.serviceType.rate : 1000
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
            <h1 className="fw-bold"><span className='text-success'>"Professional TV Installation"</span> - Elevate Your Viewing Experience!</h1>
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
                        <strong>Service Scope</strong> - Our TV installation services include basic TV installation, wall mounting, and soundbar installation.
                      </li>
                      <li>
                        <strong>Customer Responsibilities</strong> - Ensure the location is clear for TV installation and provide the necessary equipment (mounting brackets, etc.) if needed.
                      </li>
                      <li>
                        <strong>Liability</strong> - We are not responsible for pre-existing wall conditions, or for any damage to furniture or wiring.
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
            <img width={'80%'} className="mt-5 ms-5 shadow rounded-3" src={tvInstallationImage} alt="" />
          </div>
          <div className="mt-5">
            <h3 className="fw-bold">How it Works</h3>
            <p>Our TV installation services offer expert setup for your viewing pleasure:</p>
            <p>
              Whether you're mounting your TV on the wall, setting up a soundbar, or just need a basic installation, our experienced technicians will ensure a seamless setup. We'll take care of everything from securing the right positioning to connecting your devices.
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

export default Tv;
