import React from 'react';
import './HamburgerIcon.css';

const HamburgerIcon = ({ open }) => (
  <div className={`hamburger-icon ${open ? 'open' : ''}`}>
    <span></span>
    <span></span>
    <span></span>
  </div>
);

export default HamburgerIcon;
