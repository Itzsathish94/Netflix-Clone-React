import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import netflix_spinner from './assets/netflix_spinner.gif'; 


const Home = React.lazy(() => import('./pages/Home/Home'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Player = React.lazy(() => import('./pages/Player/Player'));

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  const [authChecked, setAuthChecked] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Logged In');
        navigate('/');
      } else {
        console.log('Logged Out');
        navigate('/login');
      }
      setAuthChecked(true); 
    });

    return () => unsubscribe();
  }, [navigate]);


  if (!authChecked) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer theme='dark' />
      <Suspense fallback={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={netflix_spinner} alt="Loading..." />
        </div>
      }>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/player/:id' element={<Player />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
