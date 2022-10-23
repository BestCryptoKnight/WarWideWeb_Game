import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/profile.css'
import { useAuth } from '../../contexts/AuthContext';
const Profile = (props) => {
    const { account, logout } = useAuth();
    const navigate = useNavigate();
    const handleSignOut = () => {
        logout();
        navigate('/');
    }

    let string = '';
    if (account)
        string = account.name
    else
        string = 'No Name'
    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="avatar-box">
                    <div className="avatar-img" />
                </div>
                <div className="welcome">Welcome</div>
                <div className="name">{string}</div>
                <div className="contact-group">
                    <div className="contact-li">
                        <i className="fa fa-envelope"></i>
                    </div>
                    <div className="contact-li">
                        <i className="fa fa-edit"></i>
                    </div>
                    <div className="contact-li">
                        <i className="fa fa-bell"></i>
                    </div>
                </div>
            </div>
            <div className="profile-body">
                <div className="items">
                    <div className="list-item">Dashboard</div>
                    <div className="list-item">Deposit History</div>
                    <div className="list-item">Withdraw History</div>
                    <div className="list-item">Transaction History</div>
                    <div className="list-item">Account Settings</div>
                    <div className="list-item">Security Settings</div>
                    <div className="list-item" onClick={handleSignOut}>Sign Out</div>
                </div>
            </div>
        </div >
    )
}

export default Profile;