import React from "react";
import { useMediaQuery } from "react-responsive";
import "../../styles/header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Avatar } from "@material-ui/core";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

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

  let string = ''
  if (isLoggedIn)
    string = <div onClick={handleLogOutClick}>LogOut</div>
  else
    string = <div onClick={handleLogInClick}>LogIn</div>
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
