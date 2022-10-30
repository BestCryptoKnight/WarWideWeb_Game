
import React, { useState } from "react";
import "../../styles/contact.css";
import { sendEmail } from "../../api/EmailApi";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Contact = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        sendEmail(firstName + lastName, email, phoneNumber, text);
        toast.success('Successfully sent');
        navigate('/dashboard');
    };
    const firstNamehandleChange = (e) => {
        console.log(e.target.value)
        setFirstName(e.target.value);
    };
    const lastNamehandleChange = (e) => {
        setLastName(e.target.value);
    };
    const emailhandleChange = (e) => {
        setEmail(e.target.value);
    };
    const phoneNumberhandleChange = (e) => {
        setPhoneNumber(e.target.value);
    };
    const texthandleChange = (e) => {
        setText(e.target.value);
    };
    return (
        <div className="contact-section">
            <div className="contact-container">
                <div className="contact-wrapper">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-5">
                            <div className="contact-info-wrapper">
                                <h3 className="title mb-3 mb-lg-4">Contact Information</h3>
                                <p style={{ fontSize: '18px' }}>If you have any issues, suggestions, or need help please feel free to drop us a message and we will be happy to get back to you.</p>
                                <ul className="contact-info-list m-0">
                                    <li>
                                        <a href="mailto:warwideweb@gmail.com">
                                            {" "}
                                            <i className="fa fa-envelope"></i>{" "}
                                            <span>warwideweb@gmail.com</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:happyhades123@gmail.com">
                                            {" "}
                                            <i className="fa fa-envelope"></i>{" "}
                                            <span>happyhades123@gmail.com</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <form className="contact-form">
                                <h3 className="title mb-3">Get In Touch</h3>
                                <div className="row gy-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label
                                                className="form-label"
                                            >
                                                First Name <span className="text--danger">*</span>
                                            </label>
                                            <input
                                                id="fname"
                                                type="text"
                                                className="form-control form--control"
                                                onChange={firstNamehandleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label
                                                className="form-label"
                                            >
                                                Last Name <span className="text--danger">*</span>
                                            </label>
                                            <input
                                                id="lname"
                                                type="text"
                                                className="form-control form--control"
                                                onChange={lastNamehandleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label
                                                className="form-label"
                                            >
                                                Email Address <span className="text--danger">*</span>
                                            </label>
                                            <input
                                                id="email"
                                                type="text"
                                                className="form-control form--control"
                                                onChange={emailhandleChange}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label
                                                className="form-label"
                                                onChange={texthandleChange}
                                            >
                                                Your Message <span className="text--danger">*</span>
                                            </label>
                                            <textarea
                                                id="msg"
                                                className="form-control form--control msg"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <button className="cmn--btn active" onClick={handleClick}>
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
