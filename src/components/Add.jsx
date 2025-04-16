// import React from 'react'
// import { Modal } from 'react-bootstrap'
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import { Accordion, Button, FormControl, Form } from 'react-bootstrap'
// import { useState } from 'react';
// import { useEffect } from 'react';
// import electric from '../assets/electric.jpg'
// const Add = () => {
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);


// //Scroll to top when the component is mounted

//       useEffect(() => {
//         window.scrollTo(0,0);
//       }, []);

    
//       const handleUpload = ()=>{
//         const {uname,address,date,time,description} = orderDetails;
//         if(uname && address && date && time && description){
//           const reqBody = new FormData()
//           reqBody.append("uname",uname)
//           reqBody.append("address",address)
//           reqBody.append("date",date)
//           reqBody.append("time",time)
//           reqBody.append("description",description)
//           const token = sessionStorage.getItem("token")
//           if(token){
//             const reqHeaders = {
//               "Content-Type": "multipart/form-data",
//               "Authorization": `Bearer ${token}`
//             }
//             //api call
            
//           }
//           handleClose();
//         }else{
//           alert("Please fill all the details!");
//         }


//         //Add your upload logic here (e.g: send orderDetails to the server)
  

//       }
//   return (
//     <>

//     <Modal
//         centered
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}>
//           <Modal.Header closeButton>
//           <Modal.Title>Enter the Required Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//           <FloatingLabel
//           controlId="floatingInput" label="Enter Your Name" className="mb-3">
//           <Form.Control onChange={e=>setOrderDetails({...orderDetails,uname:e.target.value})} type="name" placeholder="name" />
//           </FloatingLabel>
//           <FloatingLabel
//           controlId="floatingInput" label="Enter Your Address" className="mb-3">
//           <Form.Control onChange={e=>setOrderDetails({...orderDetails,address:e.target.value})} type="name" placeholder="name" />
//           </FloatingLabel>
//           <FormControl onChange={e=>setOrderDetails({...orderDetails,date:e.target.value})} type="date" controlId="floatingInput" className='mb-3'></FormControl>
//           <FormControl onChange={e=>setOrderDetails({...orderDetails,time:e.target.value})} type="time" controlId="floatingInput" className='mb-3'></FormControl>
//           <FloatingLabel
//           controlId="floatingInput" label="Description if any" className="mb-3">
//           <Form.Control onChange={e=>setOrderDetails({...orderDetails,description:e.target.value})} type="name" placeholder="name" />
//           </FloatingLabel>
//           </Modal.Body>
//           <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>Close</Button>
//           <Button onClick={handleUpload} variant="primary">Submit</Button>
//           </Modal.Footer>
//           </Modal>

//     </>
//   )
// }

// export default Add