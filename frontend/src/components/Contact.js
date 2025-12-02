// src/components/Contact.js
import React from "react";

export function Contact() {
  return (
    <section id="contact" style={styles.section}>
      <div style={styles.content}>
        <h2 style={styles.title}>Contact Us</h2>
        <p style={styles.text}>Email: noone786@gmail.com</p>
        <p style={styles.text}>Phone: 0333-xxxxxxx</p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    display: "flex",
    justifyContent: "center",       
    alignItems: "center",           
    textAlign: "center",
    padding: "20px",
    background: "#e0f7fa",         
  },
  content: {
    maxWidth: "500px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#00796b",
  },
  text: {
    fontSize: "20px",
    lineHeight: "1.6",
    color: "#004d40",
  },
};

export default Contact;
