import { useEffect , useState } from "react";
import { useNavigate ,useParams ,Link} from "react-router-dom";
import axios from "axios";

export default function AffecterFormateur(){
    const {id} = useParams()
    const [fil,setfil]=useState('')
    const [grp,setGrp]=useState([])
    const [groupe,setGroupe]=useState('')
    const [modules,setModules]=useState([])
    const [info,setInfo]=useState({
        id:'',
        name:'',
        type:'',
        formateur:id,
        constroles:[]
    })
    const [filiere,setFiliere]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/filiere`)
        .then(res=>setFiliere(res.data))
        .catch(err=>console.log(err))
    })

    useEffect(()=>{
        axios.get(`http://localhost:8080/groupe/filiere/${fil}`)
        .then(res=>setGrp(res.data))
        .catch(err=>console.log(err))
        },[fil])




    return  <div>
    <nav className="nav">
       <img src='http://localhost:3000/ofppt.png' alt="logo"></img>
       <h2 style={{color:'white'}}>NTIC SYBA</h2>
       <hr></hr>
       <Link to={'/login'}><button type='button' style={{backgroundColor:'transparent',border:'none'}} className="btns"><img src="http://localhost:3000/home.png" alt="home"></img><span>Formateur</span></button></Link>
       <button type='button' className="btns" ><img src="http://localhost:3000/graduate.png" alt="home"></img><span>Groupes</span></button>
   </nav>
   <div className="split">
       <section>
           <form>
                <label className="form-label">filiere</label>
                    <select onClick={(e)=>{setfil(e.target.value);
                    setModules(filiere.map(er=>{
                        if(er.filiere===fil){
                            return er.modules
                        }
                    }))
                    }}>
                        {filiere.map((e)=><option value={e}>
                            {e.filiere}
                        </option>)}
               </select>
               <label className="form-label">Groupe</label>
                    <select onClick={(e)=>setGroupe(e.target.value)}>
                        {grp===null?'':grp.map((e)=><option value={e}>
                            {e}
                        </option>)}
               </select>
               <label className="form-label">id</label>
               <input onChange={(e)=>setInfo({...info,id:e.target.value})} className="form-control" type="text"></input>
               <label className="form-label">name</label>
               <select onClick={(e)=>setInfo({...info,name:e.target.value})}>
                   {modules.map((e)=><option value={e}>
                       {e}
                   </option>)}
               </select>
               <select onClick={(e)=>setInfo({...info,type:e.target.value})}>
                   <option value={''} selected disabled>Choisisser type de module</option>
                   <option value={'R'}> Regionale</option>
                   <option value={'L'}>Local</option>
               </select>
               <button type="button">Ajouter Module</button>
           </form>
       </section>
   </div>
</div>

}