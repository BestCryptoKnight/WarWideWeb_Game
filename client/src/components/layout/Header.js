import React from "react";
import "../../styles/header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleClick = (item) => {
    switch (item) {
      case 0: navigate('/dashboard/main'); break;
      case 1: navigate('/dashboard/deposit'); break;
      case 2: navigate('/dashboard/withdraw'); break;
      case 3: navigate('/dashboard/transaction'); break;
      case 4: navigate('/dashboard/account'); break;
      case 5: navigate('/dashboard/security'); break;
      default: navigate('/dashboard/main')
    }
    togglePages()
    triggerMobile()
  }

  const handleLogOutClick = () => {
    logout();
    navigate('/');
    triggerMobile();

  }

  const handleLogInClick = () => {
    navigate('/signin');
    triggerMobile();
  }

  const handleHomeClick = () => {
    navigate('/');
    triggerMobile();
  }
  const handleContactClick = () => {
    navigate('/contact')
    triggerMobile();
  }

  const handleFaqClick = () => {
    navigate('/faq');
    triggerMobile();

  }

  const triggerMobile = () => {
    let classList = document.getElementsByClassName("menu")[0].classList;
    if (classList.contains('active')) classList.remove("active");
    else classList.add("active");
  }

  const togglePages = () => {
    let classList = document.getElementsByClassName("sub-menu")[0].classList;
    if (classList.contains('active')) classList.remove("active");
    else classList.add("active");
  }

  let string = ''
  if (isLoggedIn)
    string = <div onClick={handleLogOutClick}>LogOut</div>
  else
    string = <div onClick={handleLogInClick}>LogIn</div>

  let pageString = ''
  if (isLoggedIn)
    pageString = <li className="has-sub-menu">
      <div onClick={togglePages}>Pages &nbsp; <i className="fa fa-caret-down"></i></div>
      <ul className="sub-menu">
        <li onClick={() => handleClick(0)}>
          <div >Dashboard</div>
        </li>
        <li onClick={() => handleClick(1)}>
          <div >Deposit History</div>
        </li>
        <li onClick={() => handleClick(2)}>
          <div >Withdraw History</div>
        </li>
        <li onClick={() => handleClick(3)}>
          <div>Transaction History</div>
        </li>
        <li onClick={() => handleClick(4)}>
          <div>Account Settings</div>
        </li>
        <li onClick={() => handleClick(5)}>
          <div>Security Settings</div>
        </li>
      </ul>
    </li>
  else
    pageString = ''
  return (
    <div className="header sticky">
      <div className="header-container">
        <div className="header-bottom">
          <div className="header-bottom-area align-items-center">
            <div className="logo-img"></div>
            <ul className="menu">
              <li>
                {string}
              </li>
              <li>
                <div onClick={handleHomeClick}>Home</div>
              </li>
              <li>
                <div onClick={handleFaqClick}>Faq</div>
              </li>
              {pageString}
              <li>
                <div onClick={handleContactClick}>Contact</div>
              </li>
              <button className="btn-close btn-close-white d-lg-none" onClick={triggerMobile}></button>
            </ul>
            <div className="header-trigger-wrapper d-flex d-lg-none align-items-center">
              <div className="header-trigger me-4" onClick={triggerMobile} >
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
