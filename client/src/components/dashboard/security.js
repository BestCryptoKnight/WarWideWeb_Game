import React, { useState } from 'react';
import '../../styles/security.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../api/AccountApi';

const Security = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.name);
        console.log(e.target.value);
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const clickSubmit = async () => {
        try {
            console.log('data: ', formData);
            if (!formData.currentPassword || !formData.password || !formData.passwordConfirmation)
                toast.error('fill the all blanks!')
            else if (formData.password !== formData.passwordConfirmation){
                toast.error(formData.password, formData.passwordConfirmation, 'passwords must be match');
            }
            else {
                await toast.promise(changePassword(formData),
                    {
                        loading: 'Saving...',
                        success: <b>Successfully Changed!</b>,
                        error: <b>Could not perform.</b>,
                    })
                navigate('/game');
            }
        } catch (error) {
            toast.error(error);
        }
    };
    return (
        <div className="security">
            <div className="custom--card section-bg">
                <div className="card--body section-bg p-sm-5 p-3">
                    <div className="reset-header mb-5 text-center">
                        <div className="iconImg"><i className="fa fa-key icon"></i></div>
                        <h3 className="mt-3">Reset Password</h3>
                        <p>Enter your current password and new password</p>
                    </div>
                    <form autoComplete="off">
                        <div className="form-group mb-3">
                            <label className="form-label">Current Password</label>
                            <input type="password" className="form-control form--control" name="currentPassword" autoComplete="off" onChange={handleChange} />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control form--control" name="password" autoComplete="off" onChange={handleChange} />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control form--control" name="passwordConfirmation" autoComplete="off" onChange={handleChange} />
                        </div>

                        <div className="form-group mt-4">
                            <div className="cmn--btn active w-100" onClick={clickSubmit}>Change Password</div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Security;