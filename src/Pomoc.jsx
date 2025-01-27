import React, { useState, useEffect } from "react";
// Komponent Help
const Pomoc = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Funkcja obsługująca wysyłanie formularza
  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && message) {
      alert('Dziękujemy za kontakt. Odpowiemy jak najszybciej!');
      // Tutaj można wysłać formularz na serwer lub dodać dodatkową logikę
    } else {
      alert('Wszystkie pola muszą zostać wypełnione!');
    }
  };

  return (
    <main>
      <h1>Pomoc</h1>
      <p>Masz pytanie? Skontaktuj się z nami!</p>
      <form onSubmit={handleSubmit}>
        <label>Imię:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Wiadomość:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">Wyślij</button>
      </form>
    </main>
  );
};
export default Pomoc;
