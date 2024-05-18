import { useEffect , useState } from "react";
import { useNavigate ,useParams ,Link} from "react-router-dom";
import Menu from "./Menu";
import axios from "axios";
import './popup.css'
export default function AffecterFormateur(){
    const {id} = useParams()
    const [fil,setfil]=useState('')
    const [grp,setGrp]=useState([])
    const [groupe,setGroupe]=useState('')
    const [modules,setModules]=useState([])
    const [formateur,setFormateur] = useState('')
    const navigate = useNavigate()
    const [info,setInfo]=useState({
        name:'',
        formateur:id,
        controles:[
            {
                type:'cc',
                status:false,
                enonce:false,
                presence:false,
                copie:false,
                pv:false,
                numero_de_controle:1
            },
            {
                type:'cc',
                enonce:false,
                status:false,
                presence:false,
                copie:false,
                pv:false,
                numero_de_controle:2
            },
            {
                type:'cc',
                enonce:false,
                status:false,
                presence:false,
                copie:false,
                pv:false,
                numero_de_controle:3
            },
            {
                type:'efm',
                enonce:false,
                status:false,
                presence:false,
                copie:false,
                pv:false,
                nom_du_correcteur:''
                ,numero_de_controle: 4 
            }
        ]
    })
    const [filiere,setFiliere]=useState([])
    
    useEffect(()=>{
        axios.get(`http://localhost:8080/filiere`)
        .then(res=>setFiliere(res.data))
        .catch(err=>console.log(err))
        axios.get(`http://localhost:8080/formateur/${id}`)
        .then(res=>setFormateur(res.data.name))
    },[])
    useEffect(()=>{
        axios.get(`http://localhost:8080/groupe/filiere/${fil}`)
        .then(res=>setGrp(res.data))
        .catch(err=>console.log(err))
    },[fil])

    useEffect(()=>{
        if(fil!=''&&groupe==''){
        const filter = filiere.filter(e=>e.filiere==fil)
        setModules(filter[0].modules)
        console.log(modules)
        }
        else if(fil!=''&&groupe!=''){
            const filterNames = grp.filter(e=>e._id==groupe)[0].Modules
            const filter = filiere.filter(e=>e.filiere==fil)
            setModules(filter[0].modules.filter(obj =>{
                    let test=false
                    filterNames.map(e=>{
                        if(e.name===obj.name){
                            test=true
                        }
                    })
                    if(!test){
                        return obj
                    }
            }
                ))
        }
    },[fil,groupe])

    const addModule=async()=>{
        if(info.formateur>0&&info.name==''){
            alert('verifier les information !!')
        }
        else{
            await axios.put(`http://localhost:8080/module/${groupe}`,info)
            .then(()=>console.log('data created !'))
            .catch(err=>console.log(err))
            document.getElementById('popUp').style.display='block'
            document.getElementById('bgPopUp').style.opacity=0.2
        }
    }
    const ok = () =>{
        navigate('/GestionFormateur')
    }
    return  <div>
    <Menu />
   <div className="split" id="bgPopUp">
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
           <form>
                <label className="form-label">filiere</label>
                    <select onClick={(e)=>setfil(e.target.value)}>
                        <option value={''}>Choisisser une filiere</option>
                        {filiere.map((e)=><option value={e.filiere}>
                            {e.filiere}
                        </option>)}
               </select>
               <label className="form-label">Groupe</label>
                    <select onChange={(e)=>setGroupe(e.target.value)}>
                        <option value={''}>Choisisser un groupe</option>
                        {grp==null?'':grp.map((e)=><option value={e._id}>
                            {e._id}
                        </option>)}
               </select>
               <label className="form-label">name</label>
               <select onClick={(e)=>setInfo({...info,name:e.target.value})}>
                    <option value={''}>Choisisser un module</option>
                   {modules==null?'':modules.map((e)=><option value={e.name}>
                       {e.name}
                   </option>)}
               </select>
               <button type="button" onClick={()=>addModule()}>Ajouter Module</button>
           </form>
       </section>
   </div>
   <div id='popUp' style={{display:"none"}}>
        <h1>
            {formateur} is now affected to {groupe} module {info.name}
        </h1>
        <br></br>
        <button type="button" className="btn btn-outline-primary" onClick={ok}>
            OK
        </button>
    </div>
</div>

}