import React, { useState, useEffect } from "react";

// Komponent Account
const Konto = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [note, setNote] = useState('');
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  
    const handleLogin = (event) => {
      event.preventDefault();
      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        setCurrentUser(user);
      } else {
        alert('Nieprawidłowy e-mail lub hasło.');
      }
    };
  
    const handleRegister = (event) => {
      event.preventDefault();
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        alert('Użytkownik o podanym adresie e-mail już istnieje.');
        return;
      }
      const newUser = {
        firstname,
        lastname,
        email,
        password,
        notes: [],
      };
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        return updatedUsers;
      });
      alert('Rejestracja zakończona pomyślnie! Możesz się teraz zalogować.');
      setIsLogin(true);
    };
  
    const handleAddNote = () => {
      if (note.trim()) {
        const updatedUser = { ...currentUser, notes: [...currentUser.notes, { date: new Date().toLocaleDateString(), text: note }] };
        setCurrentUser(updatedUser);
        const updatedUsers = users.map((user) => (user.email === currentUser.email ? updatedUser : user));
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setNote('');
      } else {
        alert('Notatka nie może być pusta.');
      }
    };
  
    const handleDeleteNote = (index) => {
      const updatedNotes = currentUser.notes.filter((_, i) => i !== index);
      const updatedUser = { ...currentUser, notes: updatedNotes };
      setCurrentUser(updatedUser);
      const updatedUsers = users.map((user) => (user.email === currentUser.email ? updatedUser : user));
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    };
  
    const handleLogout = () => {
      setCurrentUser(null);
    };
  
    return (
      <main>
        {currentUser ? (
          // Dashboard użytkownika
          <div className="user-dashboard">
            <h1>Witaj, {currentUser.firstname} {currentUser.lastname}!</h1>
            <p>E-mail: {currentUser.email}</p>
            <div className="note-container">
              <h3>Twoje notatki</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Dodaj notatkę na dzisiejszy dzień..."
              ></textarea>
              <button onClick={handleAddNote}>Dodaj notatkę</button>
              <ul>
                {currentUser.notes.map((note, index) => (
                  <li key={index}>
                    {note.date}: {note.text}
                    <button onClick={() => handleDeleteNote(index)}>Usuń</button>
                  </li>
                ))}
              </ul>
            </div>
            <button className="logout-button" onClick={handleLogout}>Wyloguj</button>
          </div>
        ) : isLogin ? (
          // Formularz logowania
          <div className="login-form">
            <h1>Logowanie</h1>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Zaloguj się</button>
            </form>
            <p>
              Nie masz konta? <a href="#" onClick={() => setIsLogin(false)}>Zarejestruj się</a>
            </p>
          </div>
        ) : (
          // Formularz rejestracji
          <div className="register-form">
            <h1>Rejestracja</h1>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Imię"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Nazwisko"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Zarejestruj się</button>
            </form>
            <p>
              Masz już konto? <a href="#" onClick={() => setIsLogin(true)}>Zaloguj się</a>
            </p>
          </div>
        )}
      </main>
    );
  };
  export default Konto;