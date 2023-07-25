const express = require('express');
const app = express();
const path = require('path');
const hbs = require("hbs");
const port = process.env.PORT || 3000;
require("./db/db");
const User = require("./models/model");

const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",template_path)
hbs.registerPartials(partial_path)
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('',(req,res)=>{
    res.render("index")
});

app.post("/contact", async(req, res)=>{
    try {
        const Users = new User(req.body);
        console.log(Users);
        await Users.save();
            res.status(201).render('index')
    } catch (error) {
        res.status(500).send(error)
    }
   
})


app.listen(port,(err)=>{
    console.log(`server running on port no ${port}`);
})