const mongodb = require('mongoose');
mongodb.set('strictQuery',true);
mongodb.connect('mongodb://127.0.0.1:27017/Project',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log('connexion avec mongodb notification reussi groupes !'))
.catch(()=>console.log('connexion avec mongodb notification echouee groupes!'))



const getCurrentMonth = () => {
    const date = new Date();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[date.getMonth()];
};

const NotificationSchema = new mongodb.Schema({
    _id: 
        {
            type:Number
        },
    Module:
        {
            type: String
        },
    formateur: 
        {
            type:String
        },
    filiere: 
        {   
            type:String
        },
    Groupe: 
        {
            type:String
        },
    copie:
        { 
            type:Number
        },
    Date: {
        type: String,
        default: getCurrentMonth
    }
});
const Notification = mongodb.model('notifications',NotificationSchema);
module.exports=Notification