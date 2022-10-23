import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css'

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className='homepage'>
      <div className='homepage-container'>
        <div className='row-justify-center'>
          <div className='how-to-play' onClick={() => navigate('/howtoplay')}></div>
          <div className='play-now' onClick={()=>navigate('/signup')}></div>
          <div className='rules' onClick={() => navigate('/rules')}></div>
        </div> 
      </div>
    </div>
  );
}
