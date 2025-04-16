
import Card from 'react-bootstrap/Card';
import clean from '../assets/clean.jpg'
import plumber from '../assets/plumber.jpg'
import electric from '../assets/electric.jpg'
import carpenter from '../assets/carpenter.jpg'
import paint from '../assets/painting.jpg'
import ac from '../assets/ac.jpg'
import tile from '../assets/tile.jpg'
import fridge from '../assets/fridge.jpg'
import tv from '../assets/tv.jpg'
import bathroom from '../assets/bathroom.jpg'
import { useNavigate } from 'react-router-dom';
import wm from '../assets/wm.jpg'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';



const Cards = () => {
  const navigate = useNavigate()
  
  
  return (
    <>
    
    <div className='container rounded p-1 mb-5'>
      <div className='d-flex justify-content-around '>
        <Card onClick={()=>navigate("/cleaning")} style={{ width: '25%', height:'25%' }} >
          <Card.Img variant="" src={clean} />
          <Card.Body>
           <span style={{fontSize:'100%'}}>Cleaning</span>
          </Card.Body>
        </Card>
        <Card  onClick={()=>navigate("/plumber")} style={{ width: '25%', height:'25%' }} >
        <Card.Img variant="" src={plumber} />
        <Card.Body>
         <h6 style={{fontSize:'100%'}}>Plumber</h6>
        </Card.Body>
      </Card>
      <Card  onClick={()=>navigate("/electric")} style={{ width: '25%', height:'25%'  }} >
        <Card.Img variant="" src={electric} />
        <Card.Body>
         <h6 style={{fontSize:'100%'}}>Electric</h6>
        </Card.Body>
      </Card>
      </div>
      <div className='d-flex justify-content-around mt-3'>
      <Card onClick={()=>navigate("/painting")} style={{width: '25%', height:'25%' }} >
          <Card.Img variant="" src={paint} />
          <Card.Body>
           <h6 style={{fontSize:'100%'}}>Painting</h6>
          </Card.Body>
        </Card>

      <Card onClick={()=>navigate("/bathroom")} style={{ width: '25%', height:'25%'  }} >
        <Card.Img variant="" src={bathroom} />
        <Card.Body>
         <h6 style={{fontSize:'100%'}}>Bathroom</h6>
        </Card.Body>
       </Card>
        
      <Card  onClick={()=>navigate("/carpentry")} style={{width: '25%', height:'25%' }} >
        <Card.Img variant="" src={carpenter} />
        <Card.Body>
         <h6 style={{fontSize:'100%'}}>Carpentry</h6>
        </Card.Body>
      </Card>
      
      
      </div>
      <div className='d-flex justify-content-around mt-3'>
      
        <Card onClick={()=>navigate("/tile")} style={{width: '25%', height:'25%'  }} >
        <Card.Img variant="" src={tile} />
        <Card.Body>
         <h6 style={{fontSize:'100%'}}>Tiling</h6>
        </Card.Body>
      </Card>
      <Card onClick={()=>navigate("/tv")} style={{ width: '25%', height:'25%' }} >
          <Card.Img variant="" src={tv} />
          <Card.Body>
           <h6 style={{fontSize:'100%'}}>TV Repair</h6>
          </Card.Body>
        </Card>
      <Card onClick={()=>navigate("/ac")} style={{  width: '25%', height:'25%' }} >
        <Card.Img variant="" src={ac} />
        <Card.Body>
         <h6>Air Conditioner</h6>
        </Card.Body>
      </Card>
      </div>

      <div className='d-flex justify-content-around mt-3' >
      
      <Card onClick={()=>navigate("/refregerator")} style={{ width: '25%', height:'25%'  }} >
        <Card.Img variant="" src={fridge} />
        <Card.Body>
         <h6>Refrigerator</h6>
        </Card.Body>
      </Card>
      <Card onClick={()=>navigate("/washingmachine")}  style={{width: '25%', height:'25%' }} >
        
        <Card.Img src={wm} />
        <Card.Body>
         <h6>Washing Machine</h6>
        </Card.Body>
      </Card>
      </div>
    </div>
    </>
  )
}

export default Cards