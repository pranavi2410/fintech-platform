const axios = require('axios');
const transactions = require('../models/transactionModel');
const users = require('../models/userModel');

const addTransaction = async (req, res) => {
  const { amount, transaction_type } = req.body;
  const userId = req.user.id;

  const transaction = {
    id: transactions.length + 1,
    user_id: userId,
    amount,
    transaction_type,
    created_at: new Date()
  };

  transactions.push(transaction);

  const mutation = `
    mutation {
      insert_transactions(objects: { user_id: ${userId}, amount: ${amount}, transaction_type: "${transaction_type}" }) {
        returning {
          id
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      process.env.HASURA_GRAPHQL_ENDPOINT,
      { query: mutation },
      { headers: { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET } }
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Transaction failed' });
  }
};

const getTransactions = async (req, res) => {
  const userId = req.user.id;

  const query = `
    query {
      transactions(where: { user_id: { _eq: ${userId} } }) {
        id
        amount
        transaction_type
        created_at
      }
    }
  `;

  try {
    const response = await axios.post(
      process.env.HASURA_GRAPHQL_ENDPOINT,
      { query },
      { headers: { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET } }
    );
    res.json(response.data.data.transactions);
  } catch (error) {
    res.status(500).json({ message: 'Fetching transactions failed' });
  }
};

module.exports = { addTransaction, getTransactions };
