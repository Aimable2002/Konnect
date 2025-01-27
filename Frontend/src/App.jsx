import { useState, useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Sign from './pages/Sign/sign'
import Home from './pages/home/home'
import Dashboard from './pages/dashboard/dashboard'
import { useAuthContext } from './context/authContext/authContext'
import Profile from './pages/profile/profile'

import Lsign from './Lpages/Lregistration/Lsign'
import Lhome from './Lpages/Lhome/Lhome'
import Ldashboard from './Lpages/Ldashboard/Ldashboard'
import AfriPayForm from './context/afripay'

import AddJob from './pages/AdDJob/addJob'
import AddBusiness from './pages/addBusiness/addBusiness'
import InDoor from './pages/InDoor/InDoor'
import InDoorOrder from './pages/InDoor/InDoorOrder'
import AddProduct from './pages/addBusiness/addProduct'
// import BusinessPost from './pages/addBusiness/BusinessPost'

function App() {

  const {AuthUser} = useAuthContext()
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 769);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 769);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='px-4 py-4 w-screen'>
      {isSmallScreen ? (
      <Routes>
        <Route path='/sign' element={AuthUser ? <Navigate to= '/' /> : <Sign /> } />
        <Route path='/' element={AuthUser ? <Home /> : <Navigate to ='sign' />} />
        <Route path='/dashboard' element={AuthUser ? <Dashboard /> : <Navigate to ='sign' />} />
        <Route path='/account' element={AuthUser ? <Profile /> : <Navigate to ='sign' />} />
        <Route path='/job' element={AuthUser ? <AddJob /> : <Navigate to ='sign' />} />
        <Route path='/business' element={AuthUser ? <AddBusiness /> : <Navigate to ='sign' />} />
        <Route path='/indoor' element={AuthUser ? <InDoor /> : <Navigate to ='sign' />} />
        <Route path='/product' element={AuthUser ? <AddProduct /> : <Navigate to ='sign' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/sign' element={AuthUser ? <Navigate to= '/' /> : <Lsign /> } />
          <Route path='/' element={AuthUser ? <Lhome /> : <Navigate to='sign' />} />
          <Route path='/dashboard' element={AuthUser ? <Ldashboard /> : <Navigate to='sign' />} />
          <Route path='/afripay' element={AuthUser ? <AfriPayForm /> : <Navigate to='sign' />} />
          <Route path='/indoor' element={AuthUser ? <InDoorOrder /> : <Navigate to ='sign' />} />
          
        <Route path='/job' element={AuthUser ? <AddJob /> : <Navigate to ='sign' />} />
        <Route path='/business' element={AuthUser ? <AddBusiness /> : <Navigate to ='sign' />} />
        </Routes>
      )}
    </div>
  )
}

export default App
