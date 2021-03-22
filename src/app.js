const express = require("express");
const logger = require("morgan");
const app = express();

// App middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

const Banka = [
  {
    id: 1,
    name: "Vincent Iroleh",
    account_number: 2358749658,
    balance: 1000000,
    bvn: 11336985478,
  },
  {
    id: 2,
    name: "Nwachkwu",
    account_number: 8597525,
    balance: 1000000,
    bvn: 11336985478,
  },
];

// Route

// get all banking users
app.get("/api/v1/bank/users", (req, res) => {
  res.status(200).json({
    status: 200,
    success: true,
    message: "Successful",
    data: Banka,
  });
});

// get a banking user
app.get("/api/v1/bank/user/:id", (req, res) => {
  
});

// Create a user banking detail
app.post("/api/v1/bank/create", (req, res) => {
  const { id, name, account_number, balance, bvn } = req.body;
  const data = { id, name, account_number, balance, bvn };
  Banka.push(data);

  res.status(201).json({
    status: 201,
    success: true,
    message: "Account created successfully",
    data,
  });
});

// Update user details

// Delete user details

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server up on port ${port}`));
