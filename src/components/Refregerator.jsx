import React, { useState } from 'react';
import { Accordion, Button, Form, FormControl, Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import fridgeServiceImage from '../assets/ref.jpg'; // Replace with your actual image path
import Select from 'react-select';
import { addRequestAPI } from '../../services/allAPI';
import { useNavigate } from 'react-router-dom';

const Refrigerator = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const serviceOptions = [
    { value: 'Refrigerator Installation', label: 'Refrigerator Installation', rate: 1800 },
    { value: 'Cooling Issue Fix', label: 'Cooling Issue Fix (Refrigerator)', rate: 1600 },
    { value: 'Compressor Replacement', label: 'Compressor Replacement (Refrigerator)', rate: 2500 },
  ];

  const [orderDetails, setOrderDetails] = useState({
    uname: '',
    address: '',
    date: '',
    time: '',
    description: '',
    serviceType: null,
    rate: 1800,
  });

  const handleChange = (selectedOption) => {
    setOrderDetails(prev => ({
      ...prev,
      serviceType: selectedOption,
      rate: selectedOption?.rate || 1800,
    }));
  };

  const handleUpload = () => {
    const orderWithRate = {
      ...orderDetails,
      rate: orderDetails.serviceType ? orderDetails.serviceType.rate : 1800
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
      reqBody.append('rate', rate);

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
          // success logic
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
            <h1 className="fw-bold">"Reliable Refrigerator Repair" - <span className='text-success'>Chill Worries, Not Food!</span></h1>
            <div className="mt-5">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Terms and Conditions</Accordion.Header>
                  <Accordion.Body>
                    <ol>
                      <li><strong>Booking & Cancellation</strong> - Appointments should be made in advance. Cancel 24 hours before the scheduled service.</li>
                      <li><strong>Service Scope</strong> - Covers installation, cooling issue diagnosis, and compressor replacement.</li>
                      <li><strong>Customer Responsibilities</strong> - Provide access and ensure safety during the repair.</li>
                      <li><strong>Liability</strong> - We are not liable for existing faults or internal damage.</li>
                      <li><strong>Payment</strong>  Due after successful completion. No refunds for completed service.</li>
                    </ol>
                    <p><strong>By booking, you agree to these terms.</strong></p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="d-flex justify-content-end mt-5">
              <Button onClick={handleShow} variant="success fw-bold">BOOK NOW</Button>
            </div>
          </div>
          <div className="col-lg-6">
            <img width={'80%'} className="mt-5 ms-5 shadow rounded-3" src={fridgeServiceImage} alt="Fridge Service" />
          </div>
          <div className="mt-5">
            <h3 className="fw-bold">How it Works</h3>
            <p>We help fix cooling issues, compressor faults, and install new fridges:</p>
            <p>Just choose the service you need, pick a convenient date and time, and our trained technician will take care of the rest. Trust us to keep your fridge running cool and fresh!</p>
          </div>
        </div>
      </div>

      <Modal centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the Required Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Enter Your Name" className="mb-3">
            <Form.Control onChange={(e) => setOrderDetails({ ...orderDetails, uname: e.target.value })} type="text" placeholder="name" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Enter Your Address" className="mb-3">
            <Form.Control onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })} type="text" placeholder="address" />
          </FloatingLabel>
          <FormControl onChange={(e) => setOrderDetails({ ...orderDetails, date: e.target.value })} type="date" className="mb-3" />
          <FormControl onChange={(e) => setOrderDetails({ ...orderDetails, time: e.target.value })} type="time" className="mb-3" />
          <FloatingLabel controlId="floatingInput" label="Description if any" className="mb-3">
            <Form.Control onChange={(e) => setOrderDetails({ ...orderDetails, description: e.target.value })} type="text" placeholder="description" />
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
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button onClick={handleUpload} variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Refrigerator;
