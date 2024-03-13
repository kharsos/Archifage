const mongodb = require('mongoose');
mongodb.set('strictQuery',true);
mongodb.connect('mongodb://127.0.0.1:27017/Project',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('connexion avec mongodb reussi filiere !'))
.catch(()=>console.log('connexion avec mongodb echouee filiere!'))
const FiliereSchema = mongodb.Schema(
    {
        _id:String,
        filiere:String,
        modules:[]
    }
)
const Filiere = mongodb.model('filieres',FiliereSchema);
module.exports=Filiere