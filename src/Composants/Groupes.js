import { Link , useNavigate } from "react-router-dom"
import './Menu.css'
import {useState , useEffect} from 'react';
import axios from "axios";
export default function Groupes(){
    const navigate = useNavigate()
    const [filiere,setFiliere] = useState('')
    const [fil,setFil]=useState([])
    const [groupes,setGroupes] = useState([])
    const [grp,setGrp] = useState(false)
    const [info,setInfo] = useState({
    _id:'',filiere:''
    })
    useEffect(()=>{
        axios.get('http://localhost:8080/filiere')
        .then(res=>setFil(res.data))
        .catch(err=>console.log(err))
    })
    useEffect(()=>{
        axios.get(`http://localhost:8080/groupes/${filiere}`)
        .then(res=>setGroupes(res.data))
        .catch(err=>console.log(err))
    },[filiere])
    const AjouteGrp = () =>{
        if(info._id!==''&&info.filiere!==''){
        axios.post('http://localhost:8080/groupe/post',info)
        .then(res=>alert(res))
        .catch(err=>alert(err))
        setGrp(false)
        }
        else{
            alert('write the information !!')
        }
    }
    return (
        <div>
             <nav className="nav">
                <img src='http://localhost:3000/ofppt.png' alt="logo"></img>
                <h2 style={{color:'white'}}>NTIC SYBA</h2>
                <hr></hr>
                <Link to={'/GestionFormateur'}><button type='button' style={{backgroundColor:'transparent',border:'none'}} className="btns"><img src="http://localhost:3000/home.png" alt="home"></img><span>Formateur</span></button></Link>
                <button type='button' className="btns" ><img src="http://localhost:3000/graduate.png" alt="home"></img><span>Groupes</span></button>
                <Link to={'/GestionFiliere'}><button type='button' className='btns' style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3000/book.png" alt="book"></img><span>Filieres</span></button></Link>
            </nav>
            <div className="split">
            <header>
                    <button type='button' style={{marginLeft:'10px'}} onClick={()=>setGrp(true)} className='btnt'>Add Groupe</button>
                    <button type='button' className='btnb'>Log out</button>
                </header>
                <section>
                    <br></br>
                    <h1 style={{color:'#0AD1C8'}}>Gestion Groupe</h1>
                    <br></br>
                    {!grp?<><div className="filter">
                        <select id="grp" className="form-select" onClick={(e)=>setFiliere(e.target.value)}>
                            <option value={''}>Choisisser votre filiere</option>
                            {fil==null?''
                            :fil.map(e=><option>{e.filiere}</option>)}
                        </select>
                    </div>                    
                    <div className="filter">
                        {groupes.length>0?groupes.map((e)=>{
                            return <button type="button" style={{backgroundColor:'transparent',color:'#152259',margin:'10px'}} onClick={()=>navigate(`/Admin/Groupe/${e._id}/Modules`)} className="btns">{e._id}</button>
                        })
                        :'no groupe in this filiere'}
                    </div></>
                    :<form>
                        <h3 style={{color:'#152259'}}>Ajoute Groupe</h3>
                        <label className="form-label">_id</label>
                        <input type='text' className="form-control" onChange={(e)=>setInfo({...info,_id:e.target.value})}></input>
                        <select onClick={(e)=>setInfo({...info,filiere:e.target.value})} className="form-select">
                            <option value={''}>Choisisser votre filiere</option>
                            {fil==null?''
                            :fil.map(e=><option>{e.filiere}</option>)}
                        </select>
                        <button type="button" onClick={()=>AjouteGrp()}>Ajouter Groupe</button>
                    </form>
                }
                </section>
            </div>
        </div>
    )
}