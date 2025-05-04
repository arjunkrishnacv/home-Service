import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../../services/allAPI';
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import bgv2 from '../assets/bgv2.mp4'


const Auth = ({insideRegister}) => {

  const [isLogined,setisLogined] = useState(false)

  const navigate = useNavigate()

  const [inputData,setInputData] = useState({
    username:"", email:"", password:""
  })
  console.log(inputData);

  const handleRegister =async (e)=>{
    e.preventDefault()
    console.log("inside handleRegister");
    if(inputData.username && inputData.email && inputData.password){
      //alert("make api call")
      try{
        const result = await registerAPI(inputData)
        console.log(result);
        if(result.status==200){
          Swal.fire({
            title: 'Success!',
            text: `Welcome ${result.data?.username}...Please Login to Explore!!`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          navigate('/login')
          setInputData({username:"", email:"", password:""})
        }else{
          if(result.response.status==406){
            alert(result.response.data)
            setInputData({username:"", email:"", password:""})

          }
        }
        
      }catch(err){
        console.log(err);
        
      }

    }else{
      alert("Please Fill the Details!")
    }
    
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    if(inputData.email && inputData.password){
      try{
        const result = await loginAPI(inputData)
        if(result.status==200){
          Swal.fire({
            title: 'Success!',
            text: `Welcome ${result.data?.user.username},..Please Explore!!`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setisLogined(true)
          
          setTimeout(()=>{
            setInputData({
              username:"", email:"", password:""
            })
            navigate('/')
            setisLogined(false)
          },2000)
        }else{
          if(result.response.status==404){
            alert(result.response.data)
          }
          else if (result.response.status == 401) {
            alert("Incorrect email or password!");
        }
        }
      }catch(err){
        console.log(err);
      }
      
    } else {
      Swal.fire({
        title: 'Missing Fields!',
        text: 'Please fill all the details before submitting.',
        icon: 'warning',
        confirmButtonColor: '#f39c12',
        confirmButtonText: 'OK'
      });
    }
  }
  return (
    <>
    <video autoPlay muted loop className="bg-video">
        <source src={bgv2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Background Video */}
     

      {/* Overlay to make text readable */}
      {/* <div className="video-overlay"></div> */}
      
       
        <div style={{minHeight:'100vh', width:'100%'}} className='d-flex justify-content-center align-items-center'>
          <div className='container w-75'>
            <div className='shadow card p-2'>
              <div className='row align-items-center'>
                <div className='col-lg-6'>
                  <img className='img-fluid' src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?t=st=1742816012~exp=1742819612~hmac=467a3b17131da44782e42d5be061fa285577f4c05ebcd784bc2a41a1137ba7bc&w=1060" alt="" />
                </div>
                <div className='col-lg-6'>
                  <h1 className='mt-2 fw-bold text-success'><i className='fa-solid fa-home'></i> HOME SERVICES</h1>
                  
                  <h5 className='mt-4 mb-4 '>Sign {insideRegister?"Up":"In"} Your Account</h5>
                  
                   
                    {
                      insideRegister &&
                      <FloatingLabel value={inputData?.username} onChange={e=>setInputData({...inputData,username:e.target.value})} controlId="floatingInput" label="Username" className="mb-3">
                      <Form.Control type="text" placeholder="name" />
                    </FloatingLabel>
                    }
                   
    
                    <FloatingLabel onChange={e=>setInputData({...inputData,email:e.target.value})} controlId="floatingPassword" label="Email Address">
                      <Form.Control value={inputData?.email} type="email" placeholder="email" />
                    </FloatingLabel>
                    <br />
                    <FloatingLabel onChange={e=>setInputData({...inputData,password:e.target.value})} controlId="floatingPassword" label="Password">
                      <Form.Control value={inputData?.password} type="password" placeholder="Password" />
                    </FloatingLabel>
                    
                  
                  {
                    insideRegister ?
                    <div className='mt-3'>
                    <button onClick={handleRegister}  className='btn btn-primary  mb-2'>Register</button>
                    <p>Already a User? Please Click Here To <Link to={'/login'}>Login</Link></p>
                  </div>
                    
                     :
                    <div className='mt-3'>
                      <button onClick={handleLogin} className='btn btn-primary mb-2'>Login
                        {isLogined && <Spinner animation="grow" variant="light" />}
                      </button>
                      <p>New User? Please Click Here to <Link to={'/register'}>Register</Link></p>
    
                    </div> }
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Auth