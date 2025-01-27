import React, { useState, useEffect } from "react";
// Komponent Search
function Szukaj() {
  // Lista przykładowych świąt
  const holidays = [
    { name: "Nowy Rok", date: "2025-01-01" },
    { name: "Święto Trzech Króli", date: "2025-01-06" },
    { name: "Dzień Babci", date: "2025-01-21" },
    { name: "Dzień Dziadka", date: "2025-01-21" },
    { name: "Dzień Pingwinów", date: "2025-01-20" },
    { name: "Dzień Pamięci o Ofiarach Holocaustu", date: "2025-01-27" },
    { name: "Dzień Mokradeł", date: "2025-02-02" },
    { name: "Dzień Kobiet", date: "2025-03-08" },
    { name: "Dzień Kobiet i Dziewcząt w Nauce", date: "2025-02-11" },
    { name: "Międzynarodowy Dzień Nowruz", date: "2025-03-20" },
    { name: "Światowy Dzień Praw Konsumenta", date: "2025-03-15" },
    { name: "Dzień Wróbla", date: "2025-03-20" },
    { name: "Dzień Kolorowej Skarpetki", date: "2025-03-21" },
    { name: "Pierwszy Dzień Wiosny", date: "2025-03-21" },
    { name: "Dzień Ziemi", date: "2025-04-22" },
    { name: "Dzień Matki", date: "2025-05-26" },
    { name: "Światowy Dzień Pszczół", date: "2025-05-20" },
    { name: "Dzień Dziecka", date: "2025-06-01" },
    { name: "Dzień Ojca", date: "2025-06-23" },
    { name: "Międzynarodowy Dzień Uchodźcy", date: "2025-06-20" },
    { name: "Światowy Dzień Żyrafy", date: "2025-06-21" },
    { name: "Dzień Praw Człowieka", date: "2025-12-10" },
    { name: "Boże Narodzenie", date: "2025-12-25" },
    { name: "Sylwester", date: "2025-12-31" },
    { name: "Dzień Wegetarianizmu", date: "2025-10-01" },
    { name: "Dzień Ptaków", date: "2025-04-01" },
    { name: "Dzień Psa", date: "2025-07-01" },
    { name: "Międzynarodowy Dzień Wolnej Prasy", date: "2025-04-20" },
    { name: "Dzień Czerwonego Krzyża", date: "2025-05-08" },
    { name: "Wielkanoc", date: "2025-04-20" },
    { name: "Święto Pracy", date: "2025-05-01" },
    { name: "Narodowe Święto Niepodległości", date: "2025-11-11" },
  ];

  // Tablica na wydarzenia dodane przez użytkownika
  const [userEvents, setUserEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  // Funkcja wyszukiwania
  const searchHoliday = () => {
    const query = searchQuery.toLowerCase();
    const results = [...holidays, ...userEvents].filter(event =>
      event.name.toLowerCase().includes(query) || event.date.includes(query)
    );

    return results;
  };

  // Funkcja dodawania wydarzenia
  const addEvent = () => {
    if (eventName && eventDate) {
      const newEvent = { name: eventName, date: eventDate };
      setUserEvents([...userEvents, newEvent]);
      setEventName('');
      setEventDate('');
      alert('Wydarzenie zostało dodane!');
    } else {
      alert('Proszę wypełnić wszystkie pola!');
    }
  };

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#FFF7F7', padding: '20px' }}>
   
         <main>
        <section>
          <h2>Wyszukaj Święto w 2025 roku!</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj święta..."
          />
          <div id="search-results-list">
            {searchHoliday().length === 0 ? (
              <p>Brak wyników.</p>
            ) : (
              searchHoliday().map((event, index) => (
                <div key={index} className="search-result">
                  <strong>{event.name}</strong> - {event.date}
                </div>
              ))
            )}
          </div>
        </section>

        <section style={{ marginTop: '20px' }}>
          <h3>Dodaj Wydarzenie</h3>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Nazwa wydarzenia"
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <button onClick={addEvent}>Dodaj Wydarzenie</button>
        </section>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '30px' }}>
        <p>&copy; 2025 Kalendarz Wydarzeń</p>
      </footer>
    </div>
  );
}
export default Szukaj;