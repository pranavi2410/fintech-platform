const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/userModel');

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: users.length + 1, username, email, password: hashedPassword, created_at: new Date() };
  users.push(user);

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

module.exports = { registerUser, loginUser };
