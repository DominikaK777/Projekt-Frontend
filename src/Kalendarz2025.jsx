import React, { useEffect } from "react";

const Kalendarz2025 = () => {
  useEffect(() => {
    generateCalendar(2025);
  }, []);

  // Funkcja generująca kalendarz
  const generateCalendar = (year) => {
    const months = [
      "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
      "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
    ];

    const calendarContainer = document.getElementById("calendar-container");
    calendarContainer.innerHTML = ""; // Czyszczenie kontenera przed dodaniem nowych danych

    // Iteracja po miesiącach
    months.forEach((month, index) => {
      const monthContainer = document.createElement("div");
      monthContainer.classList.add("month");

      // Tworzenie nagłówka miesiąca
      const monthName = document.createElement("div");
      monthName.classList.add("month-name");
      monthName.textContent = `${month} ${year}`;
      monthContainer.appendChild(monthName);

      // Dodanie dni tygodnia
      const daysOfWeek = ["N", "P", "W", "Ś", "C", "P", "S"];
      const daysOfWeekContainer = document.createElement("div");
      daysOfWeekContainer.classList.add("days-of-week");
      daysOfWeek.forEach((day) => {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        daysOfWeekContainer.appendChild(dayElement);
      });
      monthContainer.appendChild(daysOfWeekContainer);

      // Dodanie dni miesiąca
      const daysContainer = document.createElement("div");
      daysContainer.classList.add("days");

      // Pierwszy dzień miesiąca
      const firstDay = new Date(year, index, 1).getDay();
      const daysInMonth = new Date(year, index + 1, 0).getDate();

      // Dodanie pustych dni na początek
      for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("day");
        daysContainer.appendChild(emptyDay);
      }

      // Dodanie dni miesiąca
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i;
        daysContainer.appendChild(dayElement);
      }

      monthContainer.appendChild(daysContainer);
      calendarContainer.appendChild(monthContainer);
    });
  };

  return (
    <div>
      <h1>Kalendarz na rok 2025</h1>
      <div className="calendar-container" id="calendar-container"></div>
    </div>
  );
};

export default Kalendarz2025;
