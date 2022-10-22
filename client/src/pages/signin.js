import React, { useState, useEffect } from 'react';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const SignIn = () => {
    const navigate = useNavigate();
    const { login, isLoggedIn } = useAuth();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isLoggedIn)
            navigate('/game');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const walletConnect = async () => {
        if (typeof window.ethereum !== "undefined") {
            const useraddress = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setFormData((prev) => ({ ...prev, "wallet": useraddress[0] }));
            console.log("wallet: ", useraddress[0]);
            toast.success('wallet connected.')
        } else {
            toast.error('You should install metamask wallet first.')
            window.open("https://metamask.io/download/");
        }
    }

    const clickSubmit = async () => {
        try {
            console.log('data: ', formData);
            if (!formData.wallet)
                toast.error('you should connect wallet first.');
            else if (!formData.name || !formData.password)
                toast.error('fill the all blanks!')
            else {
                await toast.promise(login(formData),
                    {
                        loading: 'Saving...',
                        success: <b>Welcome!</b>,
                        error: <b>Login Failed.</b>,
                    })
                navigate('/game');
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className='signup'>
            <div className='signup-container'>
                <form className='account-form-wrapper'>
                    <div className='account-logo'></div>
                    <div className='account-content'>
                        <div className="wallet-button">
                            <div className="wallet-icon"></div>
                            <div className='wallet-text' onClick={walletConnect}>Wallet Connect</div>
                        </div>
                        <div className="input-container">
                            <i className="fa fa-user icon"></i>
                            <input className="input-field" type="text" placeholder="Username" name="name" onChange={handleChange} required />
                        </div>
                        <div className="input-container">
                            <i className="fa fa-key icon"></i>
                            <input className="input-field" type="password" placeholder="Password" name="password" onChange={handleChange} required />
                        </div>
                        <div className='cmn-btn' onClick={clickSubmit}>Sign In</div>
                    </div>
                </form>
                <div className='account-type-wrapper'>
                    <div className="text-base">Welcome to WarWideWeb</div>
                    <div className="text-white">Sign in your Account. Atque, fuga sapiente, doloribus qui enim tempora?</div>
                    <div className="row-content">
                        <div className="text-white">Don't you have Account yet? </div>
                        <div className="link-text" onClick={() => navigate('/signup')}>Sign Up</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn