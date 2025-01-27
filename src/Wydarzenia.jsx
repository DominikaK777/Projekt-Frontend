import React, { useState, useEffect } from "react";
// Komponent Calendar
const Wydarzenia = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEvent, setNewEvent] = useState("");
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || {}
  );

  // Funkcja generująca aktualny miesiąc i rok
  const getMonthYear = () => {
    const monthNames = [
      "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
      "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ];
    return {
      month: monthNames[currentDate.getMonth()],
      year: currentDate.getFullYear()
    };
  };

  // Funkcja generująca dni w kalendarzu
  const generateDays = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null); // Puste dni
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  // Funkcja zmiany dnia
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  // Funkcja dodawania wydarzenia
  const addEvent = () => {
    if (newEvent.trim() === "") return;
    const updatedEvents = { ...events };
    if (!updatedEvents[selectedDay]) updatedEvents[selectedDay] = [];
    updatedEvents[selectedDay].push(newEvent);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setNewEvent("");
  };

  // Funkcja usuwania wydarzenia
  const removeEvent = (day, index) => {
    const updatedEvents = { ...events };
    updatedEvents[day].splice(index, 1);
    if (updatedEvents[day].length === 0) delete updatedEvents[day];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  // Funkcja udostępniania wydarzenia
  const shareEvent = (event) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`Mam zaplanowane wydarzenie: ${event}`)}`;
    window.open(facebookUrl, "_blank");
  };

  // Funkcja renderująca panel boczny
  const renderSidebar = () => {
    if (!selectedDay) return null;
    const dayEvents = events[selectedDay] || [];
    return (
      <div className="panel-boczny">
        <h2>Wydarzenia na {selectedDay}</h2>
        <ul>
          {dayEvents.map((event, index) => (
            <li key={index} className="element-wydarzenia">
              {event}
              <button className="przycisk-usun" onClick={() => removeEvent(selectedDay, index)}>
                Usuń
              </button>
              <button className="przycisk-udostepnij" onClick={() => shareEvent(event)}>
                Udostępnij
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Dodaj nowe wydarzenie"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
        />
        <button className="przycisk-dodaj" onClick={addEvent}>
          Dodaj
        </button>
      </div>
    );
  };

  return (
    <div className="aplikacja">
      <header className="naglowek">
        <h1>Kalendarz wydarzeń</h1>
      </header>
      <main className="kontener-kalendarza">
        <div className="kalendarz">
          <h2>{`${getMonthYear().month} ${getMonthYear().year}`}</h2>
          <div className="dni-tygodnia">
            <span>Pon</span>
            <span>Wt</span>
            <span>Śr</span>
            <span>Czw</span>
            <span>Ptk</span>
            <span>Sob</span>
            <span>Nie</span>
          </div>
          <div className="siatka-kalendarza">
            {generateDays().map((day, index) => (
              <div
                key={index}
                className={`dzien ${day && events[day] ? "dzien-z-wydarzeniem" : ""}`}
                onClick={() => day && handleDayClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        {renderSidebar()}
      </main>
    </div>
  );
};
export default Wydarzenia;