const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

let existingUsers = [
  { username: "alice", email: "alice@example.com", age:"25", password: "alice@julie1234"},
  { username: "bob", email: "bob@example.com",age :"30", password: "hiimac@1010"},
  { username:"charlie",email:"charlie@example.com",age:"28",password:"9/11_alpha"}
];


app.get('/', (req, res) => {
  res.send('Welcome to the User API');
});


app.post('/signup', (req, res) => {
  const { username, email,age, password} = req.body;

  if (!username || !email ||!age) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (age<0 || age > 120) {
    return res.status(400).json({ error: "Age must be more than 0 and less than 120 years." });
  }

  const newUser = { username, email,age, password,  };
  existingUsers.push(newUser);

  return res.status(201).json({ message: "User created successfully", user: username });
});


app.get('/user-info', (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }



  const currentUser = existingUsers.find(user => user.username === username);
  if (!currentUser) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ message: "User found", currentUser });
});


app.put('/update-user', (req, res) => {
  const { username, newUsername } = req.body;

  const user = existingUsers.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.username = newUsername || user.username;
  res.json({ message: "User updated", user });
});

app.delete('/delete-user', (req, res) => {
  const { username } = req.body;

  const index = existingUsers.findIndex(u => u.username === username);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  existingUsers.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
