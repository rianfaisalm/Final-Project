// Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2023 Rian Faisal Mahendra. All Rights Reserved.</p>
    </footer>
  );
};

const footerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: "0",
  position: 'fixed',
  bottom: '0',
  left: "0",
  width: '100%',
  zIndex: "1000",
};

export default Footer;
