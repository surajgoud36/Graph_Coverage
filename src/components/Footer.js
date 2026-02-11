import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';


function Footer() {
  return (
    <footer className="bg-dark text-center text-lg-start">
      <div className="text-center p-3">
      Graph Coverage
        <div>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-4 text-reset">
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-4 text-reset">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-4 text-reset">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
