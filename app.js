const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for customer accounts
var customers = {
  0 : {
    "name" : "Rose",
    "account_number": 1000,
    "amount" : 10000,
  },

  1 : {
    "name" : "Tiffany",
    "account_number": 1001,
    "amount" : 10000,
  },

  2 : {
    "name" : "Kirk",
    "account_number": 1003,
    "amount" : 10000,
  },

  3 : {
    "name" : "Kent",
    "account_number": 1004,
    "amount" : 10000,
  }
};

app.get('/', (res) => {
  res.send('Hello World!')
})

// Deposit money
app.post('/deposit', (req, res) => {
  const amount = req.body.amount;
  const account_number = req.body.account_number;

  if (amount < 0 || !account_number) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  for (const customerId in customers) {
    if (customers.hasOwnProperty(customerId)) {
      const customer = customers[customerId];
      if (customer.account_number == account_number) {
        customer.amount += amount
        return res.json({ 
          status: true,
          message: 'Deposit successful',
          data: customer 
        });
      }
    }
  }

  return res.status(404).json({ message: 'Account Number not found' }); // Name exists in the customers object

});

// Withdraw money
app.post('/withdraw', (req, res) => {
  const amount = req.body.amount;
  const account_number = req.body.account_number;

  if (amount < 0 || !account_number) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  for (const customerId in customers) {
    if (customers.hasOwnProperty(customerId)) {
      const customer = customers[customerId];
      if (customer.account_number == account_number) {
        if (customer.amount < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
        } else {
          customer.amount -= amount
          return res.json({ 
            status: true,
            message: 'Withdrawal successful',
            data: customer 
          });
        }
      }
    }
  }

  return res.status(404).json({ message: 'Account Number not found' }); // Name exists in the customers object
});

// Check money
app.post('/check-balance', (req, res) => {
  const account_number = req.body.account_number;

  if (!account_number) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  for (const customerId in customers) {
    if (customers.hasOwnProperty(customerId)) {
      const customer = customers[customerId];
      if (customer.account_number == account_number) {
        return res.json({ 
          status: true,
          message: 'Success',
          data: customer 
        });
      }
    }
  }

  return res.status(404).json({ message: 'Account Number not found' }); // Name exists in the customers object
});

// Bank manager function - Get total balance
app.get('/total-balance', (req, res) => {
  var totalBalance = 0;

  for (const customerId in customers) {
    if (customers.hasOwnProperty(customerId)) {
      const customer = customers[customerId];
      totalBalance += customer.amount
    }
  }
  res.json({ totalBalance });
});

// Money transfer
app.post('/transfer', (req, res) => {
  const from= req.body.from;
  const to = req.body.to;
  const amount = req.body.amount;
  var error = 0;

  if (!from || !to || amount < 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  for (const customerId1 in customers) {
    if (customers.hasOwnProperty(customerId1)) {
      const customer1 = customers[customerId1];

      if (customer1.account_number == from) {
        if (customer1.amount < amount) {
          return res.status(400).json({ message: 'Insufficient balance' });
        } else {
          customer1.amount -= amount
        }
      }
    }
  }

  for (const customerId2 in customers) {
    if (customers.hasOwnProperty(customerId2)) {
      const customer2 = customers[customerId2];
        
      if(customer2.account_number == to) {
        customer2.amount += amount
        error = 0;
      } else {
        error = 1;
      }
    }
  }

  if(error == 1){
    return res.status(404).json({ message: 'Account Number not found' }); // Name exists in the customers object
  }

  return res.json({ 
    status: true,
    message: 'Transfer successful',
  });
});

app.listen(port, () => {
  console.log(`Banking API listening at 127.0.0.1::${port}`);
});