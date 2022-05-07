import React from 'react';
import './header.css';
import img1 from '../images/Group 20399.png';
import img2 from '../images/highradiusLogo.png';

function Header(){
    return (
            <div className="property" >
                <span className="image">
                    <img src={img1} className="image"/>    
                </span>
                <span className="logo">
                    <img src={img2} width="200px" className="logo"/>
                </span>
                <div className='inv'>Invoice List</div>
            </div>
    )
}

export default Header;