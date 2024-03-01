const mongodb = require('mongoose');
mongodb.set('strictQuery',true);
mongodb.connect('mongodb://127.0.0.1:27017/Project',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('connexion avec mongodb reussi !'))
.catch(()=>console.log('connexion avec mongodb echouee !'))
const UsersSchema = mongodb.Schema(
    {
        _id:Number,
        name:String,
        email:String,
        password:String,
        type:String,
        gendre:String
    }
)
const User = mongodb.model('users',UsersSchema);
module.exports=User