import React, { useEffect, useState } from 'react';
import '../../styles/signup.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn, register } = useAuth();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isLoggedIn)
      navigate('/dashboard');
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const walletConnect = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const useraddress = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setFormData((prev) => ({ ...prev, "wallet": useraddress[0] }));
        toast.success('wallet connected.')
      }
      catch (error) {
        toast.error(error);
      }
    } else {
      toast.error('You should install metamask wallet first.')
      window.open("https://metamask.io/download/");
    }
  }

  const clickSubmit = async () => {
    try {
      if (!formData.wallet)
        toast.error('you should connect wallet first.');
      else if (!formData.name || !formData.password || !formData.password1)
        toast.error('fill the all blanks!')
      else if (formData.password !== formData.password1)
        toast.error('passwords must be match')
      else {
        await toast.promise(register(formData),
          {
            loading: 'Saving...',
            success: <b>Successfully registered!</b>,
            error: <b>Could not save.</b>,
          })
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className='signup'>
      <div className='signup-container'>
        <div className='account-form-wrapper'>
          <div className='account-logo'></div>
          <form className='account-content'>
            <div className="wallet-button" onClick={walletConnect}>
              <div className="wallet-icon"></div>
              <div className='wallet-text'>Wallet Connect</div>
            </div>
            <div className="input-container">
              <i className="fa fa-user icon"></i>
              <input className="input-field" type="text" placeholder="Username" name="name" onChange={handleChange} required />
            </div>
            <div className="input-container">
              <i className="fa fa-key icon"></i>
              <input className="input-field" type="password" placeholder="Password" name="password" onChange={handleChange} required />
            </div>
            <div className="input-container">
              <i className="fa fa-key icon"></i>
              <input className="input-field" type="password" placeholder="Confirm Password" name="password1" onChange={handleChange} required />
            </div>
            <div className='cmn-btn' onClick={clickSubmit}>Sign Up</div>
          </form>
        </div>
        <div className='account-type-wrapper'>
          <div className="text-base">Welcome to WarWideWeb</div>
          <div className="text-white">Sign in your Account. Atque, fuga sapiente, doloribus qui enim tempora?</div>
          <div className="row-content">
            <div className="text-white">Already have an Account ? </div>
            <div className="link-text" onClick={() => navigate('/signin')}>Sign In</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp