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

    const clickHandle = (item) => {
        switch (item) {
            case 0: navigate('/dashboard/main'); break;
            case 1: navigate('/dashboard/deposit'); break;
            case 2: navigate('/dashboard/withdraw'); break;
            case 3: navigate('/dashboard/transaction'); break;
            case 4: navigate('/dashboard/account'); break;
            case 5: navigate('/dashboard/security'); break;
            default: navigate('/dashboard/main')
        }
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
                    <div className="list-item" onClick={() => clickHandle(0)}>Dashboard</div>
                    <div className="list-item" onClick={() => clickHandle(1)}>Deposit History</div>
                    <div className="list-item" onClick={() => clickHandle(2)}>Withdraw History</div>
                    <div className="list-item" onClick={() => clickHandle(3)}>Transaction History</div>
                    <div className="list-item" onClick={() => clickHandle(4)}>Account Settings</div>
                    <div className="list-item" onClick={() => clickHandle(5)}>Security Settings</div>
                    <div className="list-item" onClick={handleSignOut}>Sign Out</div>
                </div>
            </div>
        </div >
    )
}

export default Profile;