import { useParams , Link} from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";
export default function Modules(){
    const {id}=useParams()
    const [grp,setGrp]=useState({})
    const [module,setModule]=useState(false)
    const [filiere,setFiliere]=useState({})
    const [formateur,setFormateur] = useState([])
    const [info,setInfo]=useState({
        name:"",
        formateur:0,
        controles:[]
    })
    const [names,setNames]=useState([])

    useEffect(()=>{
    axios.get(`http://localhost:8080/groupe/${id}`)
    .then(res=>setGrp(res.data))
    .catch(err=>console.log(err))
    })

    useEffect(()=>{
        axios.get(`http://localhost:8080/filiere/${grp.filiere}`)
        .then(res=>setFiliere(res.data))
        .catch(err=>console.log(err))
    })

    useEffect(()=>{
        axios.get('http://localhost:8080/formateur')
        .then(res=>setFormateur(res.data))
        .catch(err=>console.log(err))
    },[])

    const filter = () =>{
        const filterNames = grp.Modules.map(obj =>obj.name)
        setNames(filiere.modules.filter(obj => !filterNames.includes(obj.name)))
    }

    const addModule=async()=>{
        if(info.formateur>0&&info.name==''){
            alert('verifier les information !!')
        }
        else{
            await axios.put(`http://localhost:8080/module/${id}`,info)
            .then(()=>console.log('data created !'))
            .catch(err=>console.log(err))
        }
    }
    return(
        <div>
             <nav className="nav">
                <img src='http://localhost:3000/ofppt.png' alt="logo"></img>
                <h2 style={{color:'white'}}>NTIC SYBA</h2>
                <hr></hr>
                <Link to={'/login'}><button type='button' style={{backgroundColor:'transparent',border:'none'}} className="btns"><img src="http://localhost:3000/home.png" alt="home"></img><span>Formateur</span></button></Link>
                <button type='button' className="btns" ><img src="http://localhost:3000/graduate.png" alt="home"></img><span>Groupes</span></button>
            </nav>
            <div className="split">
                <header>
                    <button type='button' style={{marginLeft:'10px'}} onClick={()=>{setModule(!module);filter()}} className='btnt'>Add Module</button>
                    <button type='button' className='btnb'>Log out</button>
                </header>
                <section>
                    <h1 style={{color:'#0AD1C8'}}>Groupe {grp._id}</h1>
                    {!module?<table style={{marginTop:'20px'}} className="table table-striped">
                        <thead>
                        <tr>
                            <th colSpan={2}></th>
                            <th colSpan={4}>Controle N1</th>
                            <th colSpan={4}>Controle N2</th>
                            <th colSpan={4}>Controle N3</th>
                            <th>EFM</th>
                            <th>PV</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th colSpan={2}>Module</th>
                            <th>enonce</th>
                            <th>presence</th>
                            <th>copie</th>
                            <th>PV</th>
                            <th>enonce</th>
                            <th>presence</th>
                            <th>copie</th>
                            <th>PV</th>
                            <th>enonce</th>
                            <th>presence</th>
                            <th>copie</th>
                            <th>PV</th>
                            <th colSpan={3}></th>
                        </tr>
                        {grp.Modules==null?'':grp.Modules.map((e)=>{return <tr>
                            <td colSpan={2}><h6>{e.name}</h6></td>
                            {e.controles==null?'':e.controles.map((e)=>{
                                return <>
                                    <td>{!e.status.enonce?<input className="form-check-input" type="checkbox"  disabled></input>:<input type="checkbox" checked disabled></input>}</td>
                                    <td>{!e.status.presence?<input  className="form-check-input" type="checkbox" disabled></input>:<input type="checkbox" checked disabled></input>}</td>
                                    <td>{!e.status.copie?<input  className="form-check-input" type="checkbox" disabled></input>:<input type="checkbox" checked disabled></input>}</td>
                                    <td>{!e.status.pv?<input  className="form-check-input" type="checkbox" disabled></input>:<input type="checkbox" checked disabled></input>}</td>
                                </>
                            })}
                        </tr>})}
                        </tbody>
                    </table>
                    :<form>
                        <label className="form-label">name</label>
                        <select onClick={(e)=>setInfo({...info,name:e.target.value})}>
                            <option value={''} selected disabled>Choisisser un modules</option>
                            {names.map((e)=><option value={e.name}>
                                {e.name}
                            </option>)}
                        </select>
                        <select onClick={(e)=>setInfo({...info,formateur:e.target.value})}>
                            <option value={0} selected disabled>Choisisser le formateur</option>
                            {formateur.map(e=><option value={e._id}>{e.name}</option>)}
                        </select>
                        <button type="button" onClick={()=>addModule()}>Ajouter Module</button>
                    </form>
                    }
                    
                </section>
            </div>
        </div>
    )
}