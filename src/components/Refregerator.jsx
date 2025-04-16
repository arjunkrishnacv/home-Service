import React, { useState } from 'react'
import { Accordion, Button, FormControl,Form, Modal } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ref from '../assets/ref.jpg'
import Select from 'react-select';
import { addRequestAPI } from '../../services/allAPI'; 



const Refregerator = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


        const serviceOptions = [
          { value: 'Refregerator', label: 'Refregerator' },
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
    
   <div style={{minHeight:'800px'}} className='container'>
       <div className='row'>
            <div className='col-lg-6 mt-5'>
                <h1 className='fw-bold'>"Quick Fixes for Your Cooling Needs!"</h1>
                
                <div className='mt-5'>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Terms and Conditions</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                      </Accordion.Body>
                      </Accordion.Item>
                  </Accordion>  
                </div>
                <div className="d-flex justify-content-end mt-5">
                         <Button onClick={handleShow} variant="success fw-bold">BOOK NOW</Button>
                        </div>

            </div>
            <div className='col-lg-6'>
                <img width={'80%'} className='mt-5 ms-5 shadow rounded-3' src={ref} alt="" />
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

export default Refregerator