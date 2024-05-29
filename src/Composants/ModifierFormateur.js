import axios from 'axios';
import {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link , useNavigate} from 'react-router-dom';
import Menu from './Menu';
import '../App.css';
export default function ModifierFormateur(){
    const [formateur,setFormateur]=useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate()
    const {id}=useParams()
    useEffect(()=>{
        axios.get(`http://localhost:8080/formateur/${id}`)
        .then(res=>setFormateur(res.data))
        .catch(err=>console.log(err))
    },[])
    const updateTeacher = () =>{
        axios.put(`http://localhost:8080/update_formateur/${id}`,formateur)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        navigate('/GestionFormateur')
    }
    return <div>
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
                <form>
                    <label className='form-label'>Name :</label>
                    <input type='text' onChange={(e)=>setFormateur({...formateur,name:e.target.value})} value={formateur.name} className='form-control'></input>
                    <label className='form-label' >Email :</label>
                    <input type='email' onChange={(e)=>setFormateur({...formateur,email:e.target.value})} value={formateur.email} className='form-control'></input>
                    <label className='form-label'>Password :</label>
                    <input type='password' onChange={(e)=>setFormateur({...formateur,password:e.target.value})} value={formateur.password} className='form-control'></input>
                    <button type='button' onClick={()=>updateTeacher()}>Modifier</button>
                </form>
            </div>
    </div>
}