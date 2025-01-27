import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Wydarzenia from "./Wydarzenia";
import Szukaj from "./Szukaj";
import Przypomnienia from "./Przypomnienia";
import Kalendarz2025 from "./Kalendarz2025";
import Pomoc from "./Pomoc";
import Konto from "./Konto";

// Komponent Navbar
const Navbar = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Strona</Link>
        <Link to="/wydarzenia">Wydarzenia</Link>
        <Link to="/szukaj">Szukaj</Link>
        <Link to="/przypomnienia">Przypomnienia</Link>
        <Link to="/kalendarz2025">Kalendarz 2025</Link>
        <Link to="/pomoc">Pomoc</Link>
        <Link to="/konto">Konto</Link>
      </nav>
    </header>
  );
};

// Komponent Home
const Strona = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [reminderInfo, setReminderInfo] = useState("");
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminderMessage, setReminderMessage] = useState("");
  const [email, setEmail] = useState("");

  // Dodanie imienin
  useEffect(() => {
    const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    setCurrentDay(`${dayOfWeek}, ${day}`);
    setCurrentDate(`${month} ${year}`);

    // Pobranie najbliższego przypomnienia
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];

    if (reminders.length > 0) {
      // Sortowanie przypomnień po dacie i godzinie
      reminders.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });

      // Znalezienie przypomnienia, które jest najbliższe
      const todayDate = new Date();
      const closestReminder = reminders.find(reminder => {
        const reminderDateTime = new Date(`${reminder.date}T${reminder.time}`);
        return reminderDateTime >= todayDate;
      });

      if (closestReminder) {
        setReminderInfo(`${closestReminder.date} o ${closestReminder.time} - ${closestReminder.message}`);
      } else {
        setReminderInfo("Brak przypomnień.");
      }
    } else {
      setReminderInfo("Brak przypomnień.");
    }
  }, []);

  // Funkcja do ustawiania przypomnienia
  const setReminder = () => {
    if (!reminderDate || !reminderTime || !reminderMessage || !email) {
      alert('Wypełnij wszystkie pola!');
      return;
    }

    // Walidacja e-mail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert('Proszę podać poprawny adres e-mail!');
      return;
    }

    const reminder = {
      date: reminderDate,
      time: reminderTime,
      message: reminderMessage,
      email: email,
    };

    let reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));

    alert(`Przypomnienie zapisane! Powiadomienie zostanie wysłane na adres e-mail: ${email} w dniu ${reminderDate} o godzinie ${reminderTime}.`);
    setShowReminderForm(false); // Ukrycie formularza po zapisaniu przypomnienia
  };

  return (
    <main>
      <h1>Witamy w aplikacji Kalendarz Wydarzeń</h1>
      <p>Ta aplikacja pomoże Ci zorganizować wydarzenia i przypomnienia.</p>
      <div className="date-box">
        <h2>{currentDay}</h2>
        <h1>{currentDate}</h1>
      </div>
      <div className="reminder">
        <h3>Najbliższe przypomnienie</h3>
        <p>{reminderInfo}</p>
      </div>

      {/* Przycisk do wyświetlania formularza przypomnienia */}
      {!showReminderForm ? (
        <button onClick={() => setShowReminderForm(true)}>Ustaw przypomnienie</button>
      ) : (
        <div className="set-reminder">
          <h3>Ustaw przypomnienie</h3>
          <form>
            <label htmlFor="reminder-date">Data:</label>
            <input
              type="date"
              id="reminder-date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
            />
            <br />

            <label htmlFor="reminder-time">Godzina:</label>
            <input
              type="time"
              id="reminder-time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
            <br />

            <label htmlFor="reminder-message">Wiadomość:</label>
            <textarea
              id="reminder-message"
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
            ></textarea>
            <br />

            <label htmlFor="email">Adres e-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <button type="button" onClick={setReminder}>Zapisz przypomnienie</button>
            <button type="button" onClick={() => setShowReminderForm(false)}>Anuluj</button>
          </form>
        </div>
      )}

      {/* Przycisk do Kalendarza Google */}
      <a 
        href="https://calendar.google.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="custom-button"
      >
        Kalendarz Google
      </a>

      {/* Widget Imienniczek */}
      <div className="name-day">
        <div id="imienniczek-widget"></div>
        <script type="text/javascript" src="https://imienniczek.pl/widget/js"></script>
      </div>

    </main>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Strona />} />
        <Route path="/wydarzenia" element={<Wydarzenia />} />
        <Route path="/szukaj" element={<Szukaj />} />
        <Route path="/przypomnienia" element={<Przypomnienia />} />
        <Route path="/kalendarz2025" element={<Kalendarz2025 />} />
        <Route path="/pomoc" element={<Pomoc />} />
        <Route path="/konto" element={<Konto />} />
      </Routes>
    </Router>
  );
};

export default App;
