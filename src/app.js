const { json } = require("express");
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
  let { id } = req.params;
  let found = Banka.find((user) => user.id == id);
  if (found) {
    res.status(200).json({
      data: found,
    });
  } else return res.status(404).json({ message: "user not found" });
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
app.put("/api/v1/bank/update", async (req, res) => {
  let id = req.body.id;
  let updateData = req.body;

  let found = Banka.find((user) => user.id == id);

  if (found) {
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Account updated successfully",
      data: found,
    });
  } else {
    return res.status(404).json({
      status: 404,
      success: false,
      message: "Account not found",
    });
  }
});

// Delete user details

app.delete("/api/v1/bank/delete/user", (req, res) => {
  let { id } = req.body;
  Banka.forEach((user, index) => {
    if (user.id == id) {
      Banka.splice(index, 1);
      res.status(200).json({
        status: 200,
        success: true,
        message: "Account removed successfully",
      });
    }
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`server up on port ${port}`));
