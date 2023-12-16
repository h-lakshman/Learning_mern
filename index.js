const express = require("express");
const app = express();
const port = 3000;


app.use(express.json());

const users = [];
const questions = [{
    title: "maximum of array",
    description: "Given an integer array find the maximum of all numbers present in the array",
    testCases: [{
        input: [1,2,3,4,5],
        output: 5
    }]
},
{   
    title: "Minimum of array",
    description: "Given an integer array find the minimum of all numbers present in the array",
    testCases: [{
        input: [1,2,3,4,5],
        output: 1
    }]
}]

const submissions = [{
    userEmail: "lakshman@gmail.com",
    questionTtile: "Maximum of two arrays",
    code: "function(arr) { return min(arr); }",
    stauts: "rejected"
}]


app.post("/signup",(req,res) =>{
    const {email, password} = req.body;
    const isUserExists = users.find(user => user.email == email);
    if(isUserExists) res.json("User already exits. Please login");
    else{
        newUser = {
            email,
            password,
        }
        users.push(newUser);
        res.status(200).json("Account was successfully created");
    }
});

app.post("/login",(req,res) =>{
    const {email, password} = req.body;
    const isUserExists = users.find(user => user.email == email);
    const index = users.findIndex((user => user.email == email))
    if(isUserExists){
        if(users[index].password == password) res.json({
            msg:"Successfully authorized",
            token: "asfsafafASDBjasDNjknkJAj12323asdaf"
        });
        else res.status(401).json("Password is incorrect. pls login with correct password");
    }
    else res.json("User doesnot exist. pls sign up");
})

app.get("/questions",(req,res) =>{
    res.status(200).json(questions);
})

app.post("/submissions",(req,res) =>{
    const {userEmail,questionTitle,code,status} = req.body;
    newSubmission = {
        userEmail,
        questionTitle,
        code,
        status
    }
    submissions.push(newSubmission);
    res.json(submissions);
});

app.get("/submissions",(req,res) =>{
    res.json(submissions)
})

app.listen(port, (req,res) =>{
    console.log("Server is Listening");
})
