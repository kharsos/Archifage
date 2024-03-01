const express = require('express')
const app = express()
const cors= require('cors')
const Users=require('./db')
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())
app.get('/users',(req,res)=>{
    Users.find()
    .then(Users=>res.status(200).json(Users))
    .catch(error=>res.status(404).json({error}))
});
app.post('/post',(req,res)=>{
    const {_id,name,email,password,type,gendre} = req.body
    const newUser = new Users( {_id:3,name,email,password,type,gendre} )
    newUser.save()
    .then(Users=>res.status(202).json(Users))
    .catch(err=>res.status(400).json(err))
  })

app.get('/formateur',(req,res)=>{
    Users.find({type:'formateur'})
    .then(formateur=>res.status(201).json(formateur))
    .catch(err=>res.status(400).json(err))
})

app.listen(8080,console.log('connexion reussi !!')) 