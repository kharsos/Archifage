import { useEffect , useState } from "react";
import { useNavigate ,useParams ,Link} from "react-router-dom";
import axios from "axios";

export default function AffecterFormateur(){
    const {id} = useParams()
    const [fil,setfil]=useState('')
    const [grp,setGrp]=useState([])
    const [groupe,setGroupe]=useState('')
    const [formateurgrps,setFormateurgrps]=useState([])
    const [modules,setModules]=useState([])
    const [info,setInfo]=useState({
        name:'',
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

    useEffect(() => {
        axios.get(`http://localhost:8080/formateurGroupes/${info.formateur}`)
            .then(res => {setFormateurgrps(res.data);})
            .catch(err => console.log(err));
    }, [info]);
    
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
            .then(()=>{console.log('data created !')
            axios.get(`http://localhost:8080/formateurGroupes/${info.formateur}`)
            .then(res => setFormateurgrps(res.data))
            .catch(err => console.log(err));
            })
            .catch(err=>console.log(err))
        }
    }
    return  <div>
    <nav className="nav">
       <img src='http://localhost:3000/ofppt.png' alt="logo"></img>
       <h2 style={{color:'white'}}>NTIC SYBA</h2>
       <hr></hr>
       <Link to={'/GestionFormateur'}><button type='button' style={{backgroundColor:'transparent',border:'none'}} className="btns"><img src="http://localhost:3000/home.png" alt="home"></img><span>Formateur</span></button></Link>
       <button type='button' className="btns" ><img src="http://localhost:3000/graduate.png" alt="home"></img><span>Groupes</span></button>
       <Link to={'/GestionFiliere'}><button type='button' className='btns' style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3001/book.png" alt="book"></img><span>Filieres</span></button></Link>
   </nav>
   <div className="split">
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
           <table className="table table-striped">
            <thead>
                <tr>
                    <th>Groupe</th>
                    <th>Modules</th>
                </tr>
            </thead>
            <tbody>
                {formateurgrps.map(groupe => (
                    <tr key={groupe._id}>
                        <td>{groupe._id}</td>
                        <td>
                            <ul>
                            {groupe.Modules
                                    .filter(module => module.formateur === info.formateur)
                                    .map(filteredModule => (
                                        <li key={filteredModule.id} style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                            {filteredModule.name}
                                        </li>
                                    ))}
                            </ul>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

       </section>
   </div>
</div>

}