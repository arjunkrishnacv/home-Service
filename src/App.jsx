
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Cleaning from './components/Cleaning'
import Plumber from './components/Plumber'
import Carpentry from './components/Carpentry'
import Electric from './components/Electric'
import Painting from './components/Painting'
import Refregerator from './components/Refregerator'
import Tv from './components/Tv'
import Tile from './components/Tile'
import Ac from './components/Ac'
import Bathroom from './components/Bathroom'
import Washing from './components/Washing'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import Auth from './pages/Auth'




function App() {

  return (
    <>
     <Header/>
     <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/register' element={<Auth insideRegister={true}/>}/>
          <Route path='/cleaning' element={<Cleaning/>}/>
          <Route path='/plumber' element={<Plumber/>}/>
          <Route path='/carpentry' element={<Carpentry/>}/>
          <Route path='/painting' element={<Painting/>}/>
          <Route path='/refregerator' element={<Refregerator/>}/>
          <Route path='/tv' element={<Tv/>}/>
          <Route path='/tile' element={<Tile/>}/>
          <Route path='/ac' element={<Ac/>}/>
          <Route path='/bathroom' element={<Bathroom/>}/>
          <Route path='/electric' element={<Electric/>}/> 
          <Route path='/washingmachine' element={<Washing/>}/> 
          <Route path='/cart' element={<Cart/>}/>
          
     </Routes>
     
     <Footer/>
    

    </>
  )
}

export default App
