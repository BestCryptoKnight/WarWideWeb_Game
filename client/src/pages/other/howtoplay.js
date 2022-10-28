import React from 'react';
import '../../styles/howtoplay.css'
import {useNavigate} from 'react-router';
const HowToPlay = () => {
    const navigate = useNavigate();
    return (
        <div className='howtoplay'>
            <section className="about-section padding-top padding-bottom overflow-hidden">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-content">
                                <div className="section-header mb-4">
                                    <h2 className="section-header__title">How to Play</h2>
                                    <p>1v1 competition in the ultimate name that price game.</p>
                                </div>
                                <p>Every round a new product image will appear and you and another user have to guess the price of that product. Whoever is closet to the cost of the product wins that round earning the money. But be quick on your toes, because each round only lasts 10 seconds!</p>
                            </div>
                            <a className="cmn--btn active mt-sm-5 mt-4" onClick={()=> navigate('/signup')}>Get Started</a>
                        </div>
                        <div className="col-lg-6">
                            <div className="aobut-thumb section-thumb">
                                <img src="assets/images/bg2.png" alt="about" className="ms-lg-5" data-xblocker="passed" style={{ visibility: 'visible' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HowToPlay