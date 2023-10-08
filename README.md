# cooee-exam

Requirement:
npm install express
npm install --save body-parser

Run application:
node app.js

URL: 127.0.0.1/3000

I use JSON object as in memory space for this exam. For it to be use by the checker efficiently

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

API Calls:

/transfer

  Payload:
    {
      "from": 1000,
      "to": 1004,
      "amount": 500
    }
    
  Response:
    {
      "status": true,
      "message": "Transfer successful"
    }

/deposit

  Payload:
    {
      "account_number": 1000,
      "amount": 1000
    }
    
  Response:
    {
        "status": true,
        "message": "Deposit successful",
        "data": {
            "name": "Rose",
            "account_number": 1000,
            "amount": 11000
        }
    }

/withdraw

  Payload:
    {
      "account_number": 1000,
      "amount": 3000
    }
    
  Response:
    {
      "status": true,
      "message": "Withdrawal successful",
      "data": {
          "name": "Rose",
          "account_number": 1000,
          "amount": 8000
      }
    }

/total-balance

  Payload:
    {}
    
  Response:
    {
      "totalBalance": 40000
    }

/check-balance

  Payload:
    {
      "account_number": 1004
    }
    
  Response:
    {
      "status": true,
      "message": "Success",
      "data": {
          "name": "Kent",
          "account_number": 1004,
          "amount": 10500
      }
    }
  
