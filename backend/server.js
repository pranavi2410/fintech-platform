const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
