const express = require('express');
const { addTransaction, getTransactions } = require('../controllers/transactionController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, addTransaction).get(protect, getTransactions);

module.exports = router;
