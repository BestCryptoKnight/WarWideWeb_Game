import React from "react";
import FaqItem from "../../components/faqItem";
import "../../styles/faq.css";
import { faq1, faq2 } from "../../constants/faq";
const Faq = () => {
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
                return <FaqItem title={item.Q} content={item.A} id={`${index+6}`} key={index}/>;
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;
