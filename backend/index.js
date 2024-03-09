const express = require('express')
const app = express()
const cors= require('cors')
const Users=require('./db')
const Groupes = require('./grp')
const Notification = require('./notification')
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())
app.get('/users',(req,res)=>{
    Users.find()
    .then(Users=>res.status(200).json(Users))
    .catch(error=>res.status(404).json({error}))
});
app.post('/post',async(req,res)=>{
    const {name,email,password,type,gendre} = req.body
    const id =await Users.findOne({}).sort({_id:-1})
    const newUser = new Users( {_id:id._id+1,name:name,email:email,password:password,type:type,gendre:gendre} )
    newUser.save()
    .then(Users=>res.status(202).json({message:'sent'}))
    .catch(err=>res.status(400).json({err:'nothing'}))
  })
app.get('/formateur',(req,res)=>{
    Users.find({type:'formateur'})
    .then(formateur=>res.status(201).json(formateur))
    .catch(err=>res.status(400).json(err))
})

app.get('/formateur/:id',(req,res)=>{
    Users.findOne({_id:req.params.id})
    .then(formateur=>res.status(201).json(formateur))
    .catch(err=>res.status(400).json(err))
})

app.get('/groupes/:f',(req,res)=>{
    const f=req.params.f
    Groupes.find({filiere:f})
    .then(groupes=>res.status(200).json(groupes))
    .catch(err=>res.status(400).json(err))
})
app.post('/groupe/post',(req,res)=>{
    const {_id,filiere} = req.body
    const newGrp = new Groupes({_id,filiere,Modules:[]})
    newGrp.save()
    .then(groupe=>res.status(200).json(groupe))
    .catch(err=>res.status(400).json(err))
})
app.get('/groupe/:id',(req,res)=>{
    const id =req.params.id
    console.log(id)
    Groupes.findOne({_id:id})
    .then(groupes=>res.status(200).json(groupes))
    .catch(err=>res.status(400).json(err))
})

app.put('/module/:id',(req,res)=>{
    const data = req.body
    Groupes.updateOne({ _id:req.params.id },{$push:{Modules:data}})
    .then(grp=>res.json(grp))
    .catch(err=>res.json({err:'not'}))
})

app.delete('/delete/:id',(req,res)=>{
    Users.deleteOne({_id:req.params.id})
    .then(user=>res.status(200).json(user))
    .catch(err=>res.status(400).json(err))
})

app.put('/update_formateur/:id',(req,res)=>{
    const data = req.body
    Users.updateOne({_id:req.params.id},data)
    .then(user=>res.status(200).json(user))
    .catch(err=>res.status(400).json(err))
})

app.get('/notification',(req,res)=>{
    Notification.find()
    .then(notif=>res.status(200).json(notif))
    .catch(err=>res.status(400).json(err))
})

app.post('/post/notification',async(req,res)=>{
    const {notification} = req.body
    let id = await Notification.findOne().sort({_id:-1})
    if(id===null){
        id=0
    }
    else{id=id._id}
    console.log(id)
    const newNotification = new Notification({_id:id+1,notification:notification})
    newNotification.save()
    .then(notif=>res.status(200).json(notif))
    .catch(err=>res.status(400).json(err))
})

app.listen(8080,console.log('connexion reussi !!')) 