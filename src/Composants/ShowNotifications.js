import axios from 'axios';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
export default function ShowNotification(){
    const [notification,setNotification]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/notification')
        .then(res=>setNotification(res.data))
        .catch(err=>console.log(err))
    })
    return<div>
         <nav className="nav">
                <img src='http://localhost:3000/ofppt.png' alt="logo"></img>
                <h2 style={{color:'white'}}>NTIC SYBA</h2>
                <hr></hr>
                <Link to={'/login'}><button type='button' className="btns"><img src="http://localhost:3000/home.png" alt="home"></img><span>Formateur</span></button></Link>
                <Link to={'/Admin/Groupes'}><button type='button' className="btns" style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3000/graduate.png" alt="home"></img><span>Groupes</span></button></Link>
                <Link to={'/GestionFiliere'}><button type='button' className='btns' style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3000/book.png" alt="book"></img><span>Filieres</span></button></Link>
        </nav>
        <div className='split'>
                <section>
                    <h1 style={{color:'#152259'}}>Notification</h1>
                    <div className='notif'>
                        {notification.map(e=><div style={{backgroundColor:'#61dafb',color:'white',fontWeight:'bold',margin:"10px 20px"}}>
                            {e.notification}
                        </div>)}
                    </div>
                </section>
        </div>
    </div>
}