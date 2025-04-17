  import React, { use } from 'react'
  // import main from '../assets/main.mp4'
  // import pimg1 from '../assets/pimg1.jpg'
  import pimg2 from '../assets/pimg2.jpg'
  import pimg3 from '../assets/pimg3.jpg'
  import pimg4 from '../assets/pimg4.jpg'
  import pimg5 from '../assets/pimg5.jpg'
  import Cards from '../components/Cards'
  import { useNavigate } from 'react-router-dom'
  import { Button, Carousel, Nav } from 'react-bootstrap'
  import homeclean from '../assets/homeclean.jpg'
  // import { Card } from 'react-bootstrap'
  // import clean from '../assets/clean.jpg'
  // import plumber from '../assets/plumber.jpg'
  // import electric from '../assets/electric.jpg'
  // import paint from '../assets/paint.jpg'
  // import carpenter from '../assets/carpenter.jpg'
  // import bathroom from '../assets/bathroom.jpg'
  // import wm from '../assets/wm.jpg'
  // import Painting from '../components/Painting'




  const Home = () => {
    const navigate = useNavigate()
    return (
      <>
      
  <section id='home vh-100'>
      <div className='container pt-5 mb-5'>
          <div className='row'>
              <div className='col-lg-6'>
                  <div className='container mt-5'>
                    <h1 id='main' className='title text-dark fw-bold'>Book Trusted Home Services<span className='text-success'> Instantly...</span></h1>
                    <br />
                    <h5 className='text-dark'>Expert Home Services at Your Fingertips...<br/> Fast, Reliable, and Hassle-Free!</h5> <br />
                    <div className='text-dark'>
                    "Need a reliable professional for your home? We make it easy to book trusted experts for cleaning, repairs, plumbing, electrical work, and more. With fast scheduling, transparent pricing, and vetted professionals, we ensure top-quality service right at your doorstep. Book now and enjoy a hassle-free home service experience!"
                    </div> <br /> <hr />
                    <button className='btn btn-danger p-2 mt-5 mb-5'>BOOK NOW!</button>
                  </div>   



              </div>
              <div className='col-lg-6 mt-5'>
                <div className='container mt-5'>
                    <div style={{width:'100%'}} className='d-flex justify-content-evenly'>
                        <img className='rounded-top-left me-2' width={'50%'} src={pimg5} alt="" />
                        <img className='rounded-top-right' width={'50%'} src={pimg2} alt="" />
                    </div>
                
                    <div style={{width:'100%'}} className='d-flex justify-content-evenly mt-2'>
                        <img className='rounded-bottom-left me-2' width={'50%'} src={pimg3} alt="" />
                        <img className='rounded-bottom-right' width={'50%'} src={pimg4} alt="" />
                    </div>
                </div>
              </div>  
          </div>
      </div>
      <div className='backgroundimg m-3 '> 
        <div className="row align-items-center my-5">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
            <div className="  glass-effect rounded-5 p-2 w-75 mt-5 ms-5">
                    <h3 className='fw-bold text-white'>Best Cleaning Partners over the world 24x7</h3>
                    <p className="text-white mt-3">Find the perfect food ideas to start your day with the quick and easiest way</p>
                </div>
            </div>
          </div>
      </div>
  </section>

  <section id='services'>

    <div className='pt-5'>
      <div className='container mt-5 pt-5'>


        <h1 className='text-center fw-bold mb-5'>Our <span className='text-success'>Services</span></h1>
      </div>
      <Cards/>
    </div>

  </section>

  <section>
    <h1 className='text-center fw-bold'>Most booked <span className='text-success'>Services</span></h1>
      <marquee>
        <div className='d-flex container m-5 '>
          
            <img width={'35%'} height={'35%'} className="d-block me-5" src={homeclean} alt="First slide" />
        
    
          
            <img width={'35%'} height={'35%'} className="d-block me-5" src={pimg2} alt="Second slide" />
        
    
          
            <img width={'35%'} height={'35%'} className="d-block me-5" src={pimg3} alt="Third slide" />
          

          
            <img width={'35%'} height={'35%'} className="d-block me-5" src={pimg4} alt="Fourth slide" />
        
        </div>
      </marquee>
  </section>
      </>
    )
  }

  export default Home