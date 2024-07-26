document.getElementById('transactionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const transactionType = document.getElementById('transactionType').value;
    const token = localStorage.getItem('token');
  
    const response = await fetch(`/transactions/${transactionType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ amount })
    });
  
    const data = await response.json();
    if (data.success) {
      alert('Transaction successful');
      // Update account details
    } else {
      alert('Transaction failed');
    }
  });
  