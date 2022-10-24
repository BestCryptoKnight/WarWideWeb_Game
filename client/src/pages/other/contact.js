import React from 'react'
import '../../styles/contact.css'

const Contact = () => {
    return (
        <div className="contact-section">
            <div className="contact-container">
                <div className="contact-wrapper">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-5">
                            <div className="contact-info-wrapper">
                                <h3 className="title mb-3 mb-lg-4">Contact Information</h3>
                                <ul className="contact-info-list m-0">
                                    <li><a href="mailto:warwideweb@gmail.com"></a> <i className="fas fa-map-marker-alt"></i> <span>12/A Kingfisher Road <br /> Medino Washington, NY 10012, USA</span></li>
                                    <li><a href="tel:238754"> <i className="fa fa-phone"></i> <span>+47 8519-9415 1515</span></a></li>
                                    <li><a href="tel:238754"> <i className="fa fa-phone"></i> <span>+1 949 390 9747</span></a></li>
                                    <li><a href="mailto:demo@gmail.com"> <i className="fa fa-envelope"></i> <span>warwideweb@gmail.com</span></a></li>
                                    <li><a href="mailto:demo@gmail.com"> <i className="fa fa-envelope"></i> <span>happyhades123@gmail.com</span></a></li>
                                </ul>
                                <ul className="social-links mt-4">
                                    <li><a href="#0"><i className="fa fa-phone"></i></a></li>
                                    <li><a href="#0"><i className="fa fa-envelope"></i></a></li>
                                    <li><a href="#0"><i className="fa fa-map-marker-alt"></i></a></li>
                                    <li><a href="#0"><i className="fas fa-file"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <form className="contact-form">
                                <h3 className="title mb-3">Get In Touch</h3>
                                <div className="row gy-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">First Name <span className="text--danger">*</span></label>
                                            <input id="fname" type="text" className="form-control form--control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Last Name <span className="text--danger">*</span></label>
                                            <input id="lname" type="text" className="form-control form--control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Email Address <span className="text--danger">*</span></label>
                                            <input id="email" type="text" className="form-control form--control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Phone Number <span className="text--danger">*</span></label>
                                            <input id="phone" type="text" className="form-control form--control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">Your Message <span className="text--danger">*</span></label>
                                            <textarea id="msg" className="form-control form--control"></textarea>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <button className="cmn--btn active">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;