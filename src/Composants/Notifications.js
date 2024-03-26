import axios from 'axios';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
export default function Notifications(){
    const [notification,setNotification]=useState([])
    const [form,setForm]=useState(false)
    const [formateur,setFormateur]=useState([])
    const [info , setInfo]=useState({
        formateur:'',
        Module:'',
        Groupe:'',
        copie:0
    })
    useEffect(()=>{
        axios.get('http://localhost:8080/formateur')
        .then(res=>setFormateur(res.data))
        .catch(err=>console.log(err))
    })

    useEffect(()=>{
        axios.get('http://localhost:8080/notification')
        .then(res=>setNotification(res.data))
        .catch(err=>console.log(err))
    })
    const Ajouter_Notification=()=>{
        let text=`Formateur : ${info.formateur} , Module : ${info.Module} , Groupe : ${info.Groupe} , Nombre de copie : ${info.copie}`
        axios.post('http://localhost:8080/post/notification',{notification:text})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    return<div>
         <nav className="nav">
                <img src='http://localhost:3000/ofppt.png' alt="logo"></img>
                <h2 style={{color:'white'}}>NTIC SYBA</h2>
                <hr></hr>
        </nav>
        <div className='split'>
                <header>
                    <div>
                        <button type='button' className='btnt' onClick={()=>setForm(!form)}>Ajouter Notification</button>
                    </div>
                    <button type='button' className='btnb'>Log out</button>
                </header>
                <section>
                    {!form?<div className='notif'>
                        {notification.map(e=><div style={{backgroundColor:'#61dafb',color:'white',fontWeight:'bold'}}>
                            {e.notification}
                        </div>)}
                    </div>
                    :<form>
                        <label className='form-label'>Formateur</label>    
                        <select onClick={(e)=>setInfo({...info,formateur:e.target.value})}>
                            <option value={''}>Choisir le formateur</option>
                            {formateur.map(e=><option value={e.name}>{e.name}</option>)}
                        </select>
                        <label className='form-label'>Module</label>
                        <input type='text' onChange={(e)=>setInfo({...info,Module:e.target.value})}></input>
                        <label className='form-label'>Groupe</label>
                        <input type='text' onChange={(e)=>setInfo({...info,Groupe:e.target.value})}></input>
                        <label className='form-label'>Nombre de copie</label>
                        <input type='number' onChange={(e)=>setInfo({...info,copie:e.target.value})}></input>
                        <button type='button' onClick={()=>Ajouter_Notification()} >Ajouter Notification</button>
                    </form>}
                </section>
        </div>
    </div>
}