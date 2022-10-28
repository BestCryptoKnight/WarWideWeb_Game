import React from "react";
import FaqItem from "../../components/faqItem";
import "../../styles/faq.css";
import { useNavigate } from 'react-router';
import { faq1, faq2 } from "../../constants/faq";
const Faq = () => {
  const navigate = useNavigate();
  return (
    <div className="faq">
      <section className="faq-section padding-top padding-bottom overflow-hidden">
        <div className="container">
          <div className="faq-wrapper row">
            <div className="col-lg-6">
              {faq1.map((item, index) => {
                return <FaqItem title={item.Q} content={item.A} id={index} key={index} />;
              })}
            </div>
            <div className="col-lg-6">
              {faq2.map((item, index) => {
                return <FaqItem title={item.Q} content={item.A} id={`${index + 6}`} key={index} />;
              })}
            </div>
          </div>
          <a className="cmn--btn active mt-sm-5 mt-4" onClick={() => navigate('/signup')}>Get Started</a>
        </div>
      </section>
    </div>
  );
};

export default Faq;
