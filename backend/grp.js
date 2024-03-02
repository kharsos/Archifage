const mongodb = require('mongoose');
mongodb.set('strictQuery',true);
mongodb.connect('mongodb://127.0.0.1:27017/Project',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('connexion avec mongodb reussi groupes !'))
.catch(()=>console.log('connexion avec mongodb echouee groupes!'))
const GroupeSchema = mongodb.Schema(
    {
        _id:String,
        filiere:String,
        Modules:[]
    }
)
const Groupe = mongodb.model('groupes',GroupeSchema);
module.exports=Groupe