import React, { useState } from 'react'
import { Accordion, Button, FormControl,Form, Modal } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Dropdown,DropdownButton } from 'react-bootstrap'
import Select from 'react-select';
import { addRequestAPI } from '../../services/allAPI'; 


import plumb from '../assets/plumb.jpg'

const Plumber = () => {

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);


          const serviceOptions = [
            { value: 'Plumbing', label: 'plumbing' },
          ];
          
         
          const [orderDetails, setOrderDetails] = useState({
            uname: '',
            address: '',
            date: '',
            time: '',
            description: '',
            serviceType: null
          });
          
            const handleChange = (selectedOption) => {
              setOrderDetails(prev => ({
                ...prev,serviceType: selectedOption
              }));
            };
          
            const handleUpload = () => {
              const { uname, address, date, time, description, serviceType } = orderDetails;
            
              if (uname && address && date && time && description && serviceType) {
                const reqBody = new FormData();
                reqBody.append("uname", uname);
                reqBody.append("address", address);
                reqBody.append("date", date);
                reqBody.append("time", time);
                reqBody.append("description", description);
                reqBody.append("serviceType", serviceType.value); //Add selected service type to the request body
                const token = sessionStorage.getItem("token");
            
                const reqHeaders = token ? {
                  "Content-Type": "multipart/form-data",
                  "Authorization": `Bearer ${token}`
                } : {
                  "Content-Type": "multipart/form-data"
                };
            
                addRequestAPI(reqBody, reqHeaders).then(res => {
                  console.log("API Response:", res); // For debugging
                  if (res?.status === 200) {
                    alert("Request Added Successfully");
                  } else if (res?.status === 406) {
                    alert("Order already exists!");
                  } else {
                    alert("Please login!");
                  }
                });
                handleClose();
            } else {
              alert("Please fill all the details!");
            }
          };
      
      
      

  return (
   <>
       
      <div className='container'>
          <div className='row'>
               <div className='col-lg-6 mt-5'>
                       <h1 className='fw-bold'>"Your Trusted Plumber for a Leak-Free Home!"</h1>
                        <div className='container mt-5'>
                            <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Rate Chart</Accordion.Header>
                                <Accordion.Body>
                                    <table>
                                        <tr>
                                             <th>Service</th>
                                             <th>Rate</th>
                                        </tr>
                                        <tr>
                                             <td>Plumbing Service</td>
                                             <td>₹ 300/hr</td>
                                        </tr>
                                        <tr>
                                             <td>Material Charges</td>
                                             <td>₹ 100</td>
                                        </tr>
                                        <tr>
                                             <td>Service Charge</td>
                                             <td>₹ 100</td>
                                        </tr>
                                   </table>
                                    </Accordion.Body>
                                    </Accordion.Item>
                            </Accordion>
                            <br />
                            <hr />  
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Terms and Conditions</Accordion.Header>
                                    <Accordion.Body>
                                        Joboy charges for a unit of 1 hour of service initially,and every 30 minutes thereon.
                                        Material charges will be additional. Customers can either purchase the material directly or request the service partner to procure it. Time for material procurement will be charged accordingly in the final bill. Service charge will be additional.
                                    </Accordion.Body>
                                    </Accordion.Item>
                            </Accordion>
                        </div>
                        <div className="d-flex justify-content-end mt-5">
                         <Button onClick={handleShow} variant="success">BOOK NOW</Button>
                        </div>
                  
                 
   
               </div>
               <div className='col-lg-6'>
                   <img width={'80%'} className='mt-5 ms-5 shadow rounded-3' src={plumb} alt="" />
           
               </div>

               <div className='mt-5'>
                <h2 className='fw-bold'>How it Works</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore neque corporis, nesciunt exercitationem incidunt sapiente unde vitae dolores maiores praesentium commodi velit voluptatem itaque facilis deleniti eum quis inventore temporibus.
                Repellat nulla possimus dignissimos itaque deserunt, totam dolores asperiores, similique laudantium qui aut cupiditate. Debitis commodi sit earum porro reiciendis ab officia odio, neque adipisci optio, corporis id nam eum.
                Deleniti excepturi sed omnis nostrum ipsam odit iste commodi at ipsa, minus id. Expedita odit velit dolore pariatur, rem possimus, animi quas aliquid, inventore laboriosam at reiciendis sit ab error?
                Eum consequatur harum laborum voluptates, nobis vel accusamus temporibus in reiciendis ad expedita a, laboriosam itaque rem quae voluptatum doloribus adipisci commodi velit molestias tempora, praesentium natus blanditiis nam. Facere.</p>
               </div>
          </div>
      </div>


      <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
          <Modal.Header closeButton>
          <Modal.Title>Enter the Required Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FloatingLabel
          controlId="floatingInput" label="Enter Your Name" className="mb-3">
          <Form.Control onChange={e=>setOrderDetails({...orderDetails,uname:e.target.value})} type="name" placeholder="name" />
          </FloatingLabel>
          <FloatingLabel
          controlId="floatingInput" label="Enter Your Address" className="mb-3">
          <Form.Control onChange={e=>setOrderDetails({...orderDetails,address:e.target.value})} type="name" placeholder="name" />
          </FloatingLabel>
          <FormControl onChange={e=>setOrderDetails({...orderDetails,date:e.target.value})} type="date" controlId="floatingInput" className='mb-3'></FormControl>
          <FormControl onChange={e=>setOrderDetails({...orderDetails,time:e.target.value})} type="time" controlId="floatingInput" className='mb-3'></FormControl>
          <FloatingLabel
          controlId="floatingInput" label="Description if any" className="mb-3">
          <Form.Control onChange={e=>setOrderDetails({...orderDetails,description:e.target.value})} type="name" placeholder="name" />
          </FloatingLabel>
          <Select
        options={serviceOptions}
        placeholder="Select a service type"
        value={orderDetails.serviceType}
        onChange={handleChange}
        
      />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button onClick={handleUpload} variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
   
       </>
  )
}

export default Plumber