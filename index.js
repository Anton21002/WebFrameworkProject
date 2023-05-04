const http = require('http');
const fs = require('fs');
const path = require('path');

const express = require("express")
const app = express()
const hbs = require("hbs")
const collection = require("./mongodb");
const { error } = require('console');

const tempelatePath = path.join(__dirname, '../tempelates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
app.use(express.urlencoded({extended:false}))

app.use(express.static('public'));

app.get("/", (req, res)=> {
    res.render("home")
})

app.get("/home", (req, res)=> {
  res.render("home")
})

app.get("/login", (req, res)=> {
  res.render("login")
})

app.get("/signup", (req, res)=> {
    res.render("signup")
})

app.post("/signup", async (req, res)=>{
  try{
    const check = await collection.findOne({$or: [{email: req.body.email},{username: req.body.username}]})

    if(check){
      if(check.username === req.body.username){
          res.render("signup", {msg:"Username is already in use!"})
      }
      else if(check.email === req.body.email){
          res.render("signup", {msg:"Email is already in use!"})
      }
    }
    else{
      const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }

      await collection.insertMany([data])

      res.redirect("/login")
    }
  }  
  catch(error){
    res.render("signup", {msg:"Please double check your information!"})
  }
})


app.post("/login", async (req, res)=>{
    
    try{
        const check = await collection.findOne({$or: [{email: req.body.email}, {password: req.body.password}] })

        if(check.email === req.body.email){
            if(check.password === req.body.password){
                res.redirect("/home")
            }
            else{
                res.render("login", {msg: "Wrong Password!"})
            }
          }
          else{
              res.render("login", {msg: "Wrong email!"})
          } 
    }
    catch(error){
        res.render("login", {msg: "Please check your information!"})
    }
    
})

app.listen(3000,()=>{
  console.log("port connected");
})
