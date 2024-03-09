const mongodb = require('mongoose');
mongodb.set('strictQuery',true);
mongodb.connect('mongodb://127.0.0.1:27017/Project',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('connexion avec mongodb notification reussi groupes !'))
.catch(()=>console.log('connexion avec mongodb notification echouee groupes!'))
const NotificationSchema = mongodb.Schema(
    {
        _id:Number,
        notification:String
    }
)
const Notification = mongodb.model('notifications',NotificationSchema);
module.exports=Notification