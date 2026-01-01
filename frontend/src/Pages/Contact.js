import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center text-danger">Contact Us</h2>

      <form className="mt-4" onSubmit={submitForm}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required 
          ></textarea>
        </div>

        <button className="btn btn-danger w-100">Send Your Message</button>
      </form>
    </div>
  );
}

export default Contact;
