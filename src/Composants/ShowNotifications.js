import axios from 'axios';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
export default function ShowNotification(){
    const [notification,setNotification]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/notification')
        .then(res=>setNotification(res.data))
        .catch(err=>console.log(err))
    })
    return<div>
        <Menu />
        <div className='split'>
                <header>
                    <div>
                        <button type='button' className='btnb'>Export CSV</button>
                    </div>
                    <div>
                    <Link to={'/ShowNotifications'}><img style={{width:'30px'}} src='http://localhost:3000/bell.png'></img></Link>
                    <Link to={'/'}><button type='button' className='btnb'>Log out</button></Link>
                    </div>
                </header>
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