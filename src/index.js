const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
// Default-Route
app.get('/', (req, res) => {
  res.send('Willkommen auf der API! Ergänzen Sie die URL um "/api/users" für den Endpunkt.');
});

// Beispielroute
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST-Route, um einen neuen Benutzer hinzuzufügen
app.post('/api/users', (req, res) => {
  const { id, name } = req.body;

  // Überprüfen, ob alle erforderlichen Felder vorhanden sind
  if (!id || !name) {
    return res.status(400).json({ error: 'ID und Name sind erforderlich.' });
  }

  // Überprüfen, ob die ID bereits existiert
  if (users.some(user => user.id === id)) {
    return res.status(409).json({ error: 'Ein Benutzer mit dieser ID existiert bereits.' });
  }

  // Neuen Benutzer hinzufügen
  const newUser = { id, name };
  users.push(newUser);

  // Erfolgreiche Rückmeldung
  res.status(201).json(newUser);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
