import React from 'react';
import './Footer.css'; // Arquivo CSS para estilos

const Footer = () => {
  return (
    <footer className="footer">
      <p>Crafted by Leandro Hosken with best practices in responsiveness and component-based architecture.</p>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/leandrohosken/" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="bi bi-linkedin"></i>
        </a>
        <a href="https://github.com/lshv04" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="bi bi-github"></i>
        </a>
        <a href="https://wa.me/5531987670611" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="bi bi-whatsapp"></i>
        </a>
        <a href="mailto:lshv04@gmail.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="bi bi-envelope"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
