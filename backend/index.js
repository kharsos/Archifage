const express = require('express')
const app = express()
const cors= require('cors')
const Users=require('./db')
const Groupes = require('./grp')
const Notification = require('./notification')
const axios = require('axios')
const Filiere = require('./filiere')
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
app.get('/groupe/:id',async(req,res)=>{
    const id =req.params.id
    await Groupes.findOne({_id:id})
    .then(groupes=>res.status(200).json(groupes))
    .catch(err=>res.status(400).json(err))
})

app.get('/groupe/:id/formateurs',async(req,res)=>{
    const id = req.params.id;
    const groupe = await Groupes.findOne({ _id: id });
    console.log(groupe);
    const formateursDistincts = [...new Set(groupe.Modules.map(module => module.formateur))];
    console.log(formateursDistincts);
    const formateur_name=await Users.find({_id:{$in:formateursDistincts}},{_id:0,name:1})
    const result=formateur_name.map(f=>f.name)

    res.status(200).json(result)
})

app.get('/groupe/filiere/:filiere',(req,res)=>{
    const filiere =req.params.filiere
    console.log(filiere)
    Groupes.find({filiere:filiere})
    .then(groupes=>res.status(200).json(groupes))
    .catch(err=>res.status(400).json(err))
})

app.put('/module/:id',async (req,res)=>{
    const data = req.body
    if(data.name!=''&&data.formateur>0){
    const result=await Filiere.findOne({modules:{$elemMatch:{name:data.name}}},{'modules.$':1})
    const {id,type}=result.modules[0]
    Groupes.updateOne({ _id:req.params.id },{$push:{Modules:{...data,id:id,type:type}}})
    .then(grp=>res.json(grp))
    .catch(err=>res.json({err:'not'}))
    }
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
    let id = await Notification.findOne().sort({_id:-1})
    if(id===null){
        id=0
    }
    else{id=id._id}
    console.log(id)
    const newNotification = new Notification({_id:id+1,...req.body})
    newNotification.save()
    .then(notif=>res.status(200).json(notif))
    .catch(err=>res.status(400).json(err))
})

app.get('/filiere/:name',async(req,res)=>{
    let filiere=req.params.name
    await Filiere.findOne({filiere:filiere})
    .then(filiere=>res.status(200).json(filiere))
    .catch(err=>res.status(400).json(err))
})

app.get('/filiere',(req,res)=>{
    Filiere.find()
    .then(filiere=>res.status(200).json(filiere))
    .catch(err=>res.status(400).json(err))
})

app.get('/name_module',(req,res)=>{
    Filiere.findOne({modules:{$elemMatch:{name:'front end'}}},{'modules.$':1})
    .then(filiere=>res.status(200).json(filiere.modules[0]))
    .catch(err=>res.status(400).json(err))
})

app.post('/post/filiere',async(req,res)=>{
    const data = req.body
    const _id=await Filiere.findOne().sort({_id:-1})
    const newFiliere = new Filiere({...data,_id:Number(_id._id)+1})
    newFiliere.save()
    .then(fil=>res.status(200).json(fil))
    .catch(err=>res.status(400).json(err))
})

app.get('/get/:id',(req,res)=>{
    const id = req.params.id
    Filiere.findOne({_id:Number(id)})
    .then(fil=>res.status(200).json(fil))
    .catch(err=>res.status(400).json(err))
})

app.put('/post/module/:id',(req,res)=>{
    const id=req.params.id
    const data = req.body
    Filiere.updateOne({_id:id},{$push:{modules:{...data}}})
    .then(fil=>res.status(200).json(fil))
    .catch(err=>res.status(400).json(err))
})

app.get('/Modules_formateur/:formateur',async(req,res)=>{
    await Groupes.aggregate([{$unwind:"$Modules"},{$match:{'Modules.formateur':req.params.formateur}},{$project:{_id:1,Modules:1,filiere:1}}])
    .then(mod=>res.status(200).json(mod))
    .catch(err=>res.status(400).json(err))
})

app.put('/Modules_formateur/:grp/:module',async(req,res)=>{
    if(req.body.numero_de_controle<4){
         await Groupes.updateOne(
            { _id: req.params.grp, "Modules.name": req.params.module },
            { $set: { 
                [`Modules.$.controles.${req.body.numero_de_controle-1}.enonce`]: req.body.enonce , 
                [`Modules.$.controles.${req.body.numero_de_controle-1}.pv`]: req.body.pv , 
                [`Modules.$.controles.${req.body.numero_de_controle-1}.presence`]: req.body.presence , 
                [`Modules.$.controles.${req.body.numero_de_controle-1}.copie`]: req.body.copie ,
                [`Modules.$.controles.${req.body.numero_de_controle-1}.status`]:req.body.status
            }
            })
            .then(result=>res.send(result))
            .catch(err=>res.send(err))
    }
    else{
        await Groupes.updateOne(
            { _id: req.params.grp, "Modules.name": req.params.module },
            { $set: { 
                [`Modules.$.controles.${req.body.numero_de_controle-1}.enonce`]: req.body.enonce , 
                [`Modules.$.controles.${req.body.numero_de_controle-1}.pv`]: req.body.pv , 
                [`Modules.$.controles.${req.body.numero_de_controle-1}.presence`]: req.body.presence , 
                [`Modules.$.controles.${req.body.numero_de_controle-1}.copie`]: req.body.copie , 
                [`Modules.$.controles.${req.body.numero_de_controle-1}.nom_du_correcteur`]:req.body.nom_du_correcteur } 
            })
            .then(result=>res.send(result))
            .catch(err=>res.send(err))
    }
})

app.get('/groupes/modules/percentage',async(req,res)=>{
    await Groupes.aggregate([{$unwind:"$Modules"},{$project:{_id:1,Modules:1,filiere:1}}])
    .then(mod=>res.status(200).json(mod))
    .catch(err=>res.status(400).json(err))
})

app.get('/notifications/groupe',async(req,res)=>{
    await Notification.aggregate([{$match:{}},{$group:{_id:'$Date',totalCopies:{$sum:'$copie'}}}])
    .then(result=>res.status(200).json(result))
    .catch(err=>res.send(err))
})

app.get('/notifications/groupe/:formateur',async(req,res)=>{
    const formateur = req.params.formateur
    await Notification.aggregate([{$match:{formateur:formateur}},{$group:{_id:'$Date',totalCopies:{$sum:'$copie'}}}])
    .then(result=>res.status(200).json(result))
    .catch(err=>res.send(err))
        
})


app.listen(8080,console.log('connexion reussi !!')) 