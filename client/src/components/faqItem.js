import React from 'react'

const FaqItem = (props) => {
    let flag = false;
    const handleClick = (e) => {
        if (flag) {
            document.getElementById(props.id).classList.remove('open');
            document.getElementById(props.id).querySelector(".faq-item__content-display").className = "faq-item__content";
            flag = false
        } else {
            document.getElementById(props.id).classList.remove('open');
            document.getElementById(props.id).querySelector(".faq-item__content").className = "faq-item__content-display";
            flag = true;
        }
        // if (document.getElementById(props.id).querySelector(".faq-item__content").style.height === '100px') {
        //     document.getElementById(props.id).classList.remove('open');
        //     document.getElementById(props.id).querySelector(".faq-item__content").style.height = "0px";
        // }
        // else {
        //     document.getElementById(props.id).classList.add('open');
        //     document.getElementById(props.id).querySelector(".faq-item__content").style.height = "100px";
        // }
    }
    return (
        <div className='faq-item' onClick={handleClick} id={props.id}>
            <div className="faq-item__title">
                <h5 className="title">{props.title}</h5>
            </div>
            <div className="faq-item__content" >
                <p>{props.content}</p>
            </div>
        </div>
    )
}

export default FaqItem;