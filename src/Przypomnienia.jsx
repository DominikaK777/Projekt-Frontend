import React, { useState, useEffect } from "react";

// Komponent Reminders
function Przypomnienia() {
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminderList(reminders);
  }, []);

  // Funkcja do usuwania przypomnienia
  const deleteReminder = (index) => {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.splice(index, 1);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    setReminderList(reminders); // Zaktualizowanie listy przypomnień
  };

  // Funkcja do edytowania przypomnienia
  const editReminder = (index) => {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const reminder = reminders[index];
    // Możesz otworzyć formularz edycji przypomnienia, np. przejście do formularza z wartościami przypomnienia
    alert(`Edytowanie przypomnienia: ${reminder.message}`);
  };

  return (
    <main>
      <h1>Zapisane przypomnienia</h1>
      {reminderList.length > 0 ? (
        <ul>
          {reminderList.map((reminder, index) => (
            <li key={index}>
              {reminder.date} {reminder.time} - {reminder.message} (E-mail: {reminder.email})
              <button onClick={() => deleteReminder(index)}>Usuń</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak zapisanych przypomnień.</p>
      )}
    </main>
  );
}
export default Przypomnienia;
