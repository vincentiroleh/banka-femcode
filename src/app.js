const { urlencoded } = require('express');
const express = require('express');
const logger = require('morgan');

const app = express();

//app middleware
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(logger('dev'));

//data
const Banka = [
    {
        id:1,
        name: "Sophia Abubakar",
        account_number: 535242437,
        balance: 3000000,
        bvn: 2226775526, 
    },
    {
        id:2,
        name: "Tiffy Blake",
        account_number: 563542437,
        balance: 3000,
        bvn: 22267345526, 
    }
]

//route
//get all users
app.get("/api/v1/bank/users" , (req, res)=> {
    res.status(200).json({
        status:200,
        success: true,
        message: "Successful",
        data: Banka,
    });
});


app.get("/api/v1/bank/user/:id", (req, res) => {
    const id  = req.params.id;
    for(let i = 0; i < Banka.length; i++){
        if (Banka[i].id == id) {
            return  res.status(200).json({
                 status:200,
                 success: true,
                 message: "Account retrieved successfully",
                 data: user,
             })
         }else{
             res.status(400).json({
                 status:404,
                 success: true,
                 message: "User Not found",
                 data: null,
             })
         }
    }
});

app.post("/api/v1/bank/create", (req, res) => {
    const {id, name, account_number,balance, bvn} = req.body;
    const data = {id, name, account_number,balance,bvn};
    Banka.push(data);

    res.status(201).json({
        status:201,
        success:true,
        message: "Account created successfully",
        data
    })
});

//update user details
//delete user deatails



const port = process.env.PORT || 5678;
app.listen(port, ()=> console.log(`App is listening on port ${port}...`))