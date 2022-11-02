import React from 'react';
import '../../styles/rules.css';
import { useNavigate} from 'react-router';
const Rule = () => {

    const navigate = useNavigate();
    return (
        <>
            <div className="rules-page">
                <section className="about-section padding-top padding-bottom overflow-hidden">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="about-content">
                                    <div className="section-header mb-4">
                                        <h2 className="section-header__title">Rules</h2>
                                        <p>Rules are simple, before playing be sure to have a Crypto Metamask account with a minimum of $5 in ETH. Choose rooms (ETH to USD conversion $0.50, $1.00 and $3.00) per round</p>
                                    </div>
                                    <p>We never take a percentage of wins or losses, just a $3 in ETH initial fee to play. Never play against us or bots. What you win is what you keep!</p>
                                </div>
                                <a className="cmn--btn active mt-sm-5 mt-4" onClick={() => navigate('/signup')} style={{width:'170px'}}>Get Started</a>
                                <span style={{width:"30px"}}></span>
                                <a className="cmn--btn active mt-sm-5 mt-4" onClick={() => navigate(-1)} style={{width:'170px'}}>BACK</a>

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
        </>
    )
}

export default Rule