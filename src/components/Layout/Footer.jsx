import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-logo">
        <img src="/logo/logo_Orama.png" alt="Orama Natura" />
      </div>
      <div className="social-icons">
        <a
          href="https://www.instagram.com/orama_natura_/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/icons/instagram.png" alt="Instagram" className="social-icon" />
          <span>Instagram</span>
        </a>
        <a
          href="https://www.tiktok.com/@orama_natura_"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/icons/tik-tok.png" alt="TikTok" className="social-icon" />
          <span>TikTok</span>
        </a>
        <a
          href="https://www.facebook.com/orama.ru.75"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/icons/facebook.png" alt="Facebook" className="social-icon" />
          <span>Facebook</span>
        </a>
        <a
          href="https://wa.me/543794832031"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/icons/whatsapp.png" alt="WhatsApp" className="social-icon" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
    <p className="footer-copy">
      © {new Date().getFullYear()} Orama Natura - Todos los derechos reservados.
    </p>
  </footer>
);

export default Footer;
