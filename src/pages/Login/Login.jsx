import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png';
import { login, signUp } from '../../firebase'; 
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { toast } from 'react-toastify';

const Login = () => {

  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      toast.error('Email and Password are required');
      return false;
    }

    if (signState === 'Sign Up' && !name) {
      toast.error('Name is required for sign-up');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return false;
    }

    return true;
  };

  const user_auth = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
  
    try {
      if (signState === 'Sign In') {
        await login(email, password);
      } else {
        await signUp(name, email, password);
        toast.success('Sign-up successful!');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
  
      if (signState === 'Sign In') {
        if (error.code === 'auth/user-not-found') {
          toast.error('No account found with this email.');
        } else if (error.code === 'auth/wrong-password') {
          toast.error('Invalid credentials.');
        } else {
          toast.error('Authentication failed. Please try again.');
        }
      } else {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('This email is already in use.');
        } else {
          toast.error('Sign-up failed. Please try again.');
        }
      }
    }
  }
  

  return (
    loading ? 
    <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div> 
    : 
    <div className='login'>
      <img src={logo} className="login-logo" alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === 'Sign Up' ? 
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder='Your name' 
              name="name" 
            /> : 
            ''
          }
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Email' 
            name="email" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password' 
            name="password" 
          />
          <button type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In' ? 
            <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}> Sign up Now</span></p> : 
            <p>Already have an account? <span onClick={() => setSignState("Sign In")}> Sign In Now</span></p>
          }
        </div>
      </div>
    </div>
  );
}

export default Login;
