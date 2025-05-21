import React from 'react';
import './ContactPage.css'; // Asegurate que este archivo exista en la misma carpeta

const ContactPage = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h2>CONTACTOS</h2>
          <div className="contact-info">
            <p><strong>Tienda física:</strong></p>
            <p><em>Barrio Quintana, Yugoslavia 4000, Ctes, Arg.</em></p>
            <p><strong>Teléfono:</strong></p>
            <p>3794 832031</p>

            {/* Mapa embebido */}
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.7820604747717!2d-58.79811008996284!3d-27.50715257619901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456b006a19e1db%3A0x45b89861e4af90a1!2sORAMA%20NATURA!5e0!3m2!1ses!2sar!4v1747852537214!5m2!1ses!2sar"
                height="300" 
                style={{ border: 0, borderRadius: '12px', marginTop: '30px' }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
      </div>

      <footer className="social-footer">
        <a href="https://www.instagram.com/orama_natura_/" target="_blank" rel="noreferrer">
          <img src="/icons/instagram.png" alt="Instagram" className="social-icon" />
          <span>Instagram</span>
        </a>
        <a href="https://www.tiktok.com/@orama_natura_" target="_blank" rel="noreferrer">
          <img src="/icons/tik-tok.png" alt="TikTok" className="social-icon" />
          <span>TikTok</span>
        </a>
        <a href="https://www.facebook.com/orama.ru.75" target="_blank" rel="noreferrer">
          <img src="/icons/facebook.png" alt="Facebook" className="social-icon" />
          <span>Facebook</span>
        </a>
      </footer>
    </div>
  );
};

export default ContactPage;
