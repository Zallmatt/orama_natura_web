import React from "react";

const CheckoutContactForm = ({ contactData, setContactData }) => (
  <div className="checkout-contact-form">
    <label>
      Nombre y apellido:
      <input
        type="text"
        value={contactData.name}
        onChange={(e) =>
          setContactData({ ...contactData, name: e.target.value })
        }
      />
    </label>
    <label>
      Teléfono:
      <input
        type="text"
        value={contactData.phone}
        onChange={(e) =>
          setContactData({ ...contactData, phone: e.target.value })
        }
      />
    </label>
  </div>
);

export default CheckoutContactForm;
