import { useParams , Link} from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";
export default function Modules(){
    const {id}=useParams()
    const [grp,setGrp]=useState({})
    const [module,setModule]=useState(false)
    const [formateur,setFormateur] = useState([])
    const [info,setInfo]=useState({
        id:'',
        name:'',
        type:'',
        formateur:0,
        constroles:[]
    })
    useEffect(()=>{
    axios.get(`http://localhost:8080/groupe/${id}`)
    .then(res=>setGrp(res.data))
    .catch(err=>console.log(err))
    },[info.id])

    useEffect(()=>{
        axios.get('http://localhost:8080/formateur')
        .then(res=>setFormateur(res.data))
        .catch(err=>console.log(err))
    },[])

    const addModule=async()=>{
        if(info.formateur===0&&info.id===''&&info.name===''&&info.type===''){
            alert('verifier les information !!')
        }
        else{
            let test=false
            grp.Modules.map(e=>{
                if(e.id===info.id&&e.name===info.name){
                    test=true
                }
            })
            if(!test){
                await axios.put(`http://localhost:8080/module/${id}`,info)
                .then(()=>console.log('data created !'))
                .catch(err=>console.log(err))
            }
            else{
                alert('module deja exister')
            }
        }
    }
    return(
        <div>
             <nav className="nav">
                <img src="ofppt.png" alt="logo"></img>
                <h2 style={{color:'white'}}>NTIC SYBA</h2>
                <hr></hr>
                <Link to={'/login'}><button type='button' style={{backgroundColor:'transparent',border:'none'}} className="btns"><img src="home.png" alt="home"></img><span>Teachers</span></button></Link>
                <button type='button' className="btns" ><img src="graduate.png" alt="home"></img><span>Groupes</span></button>
            </nav>
            <div className="split">
                <header>
                    <button type='button' style={{marginLeft:'10px'}} onClick={()=>setModule(!module)} className='btnt'>Add Module</button>
                    <button type='button' className='btnb'>Log out</button>
                </header>
                <section>
                    <h1 style={{color:'#0AD1C8'}}>Groupe {grp._id}</h1>
                    {!module?<table style={{marginTop:'20px'}} className="table table-stripped-primary">
                        <tr>
                            <th colSpan={2}></th>
                            <th colSpan={3}>Controle N1</th>
                            <th colSpan={3}>Controle N2</th>
                            <th colSpan={3}>Controle N3</th>
                            <th>Pv CC</th>
                            <th>EFM</th>
                            <th>PV</th>
                        </tr>
                        <tr>
                            <th colSpan={2}>Module</th>
                            <th>enonce</th>
                            <th>presence</th>
                            <th>copie</th>
                            <th>enonce</th>
                            <th>presence</th>
                            <th>copie</th>
                            <th>enonce</th>
                            <th>presence</th>
                            <th>copie</th>
                        </tr>
                        {grp.Modules==null?'':grp.Modules.map((e)=>{return <tr>
                            <td colSpan={2}><h6>{e.name}</h6></td>
                            {e.controles==null?'':e.controles.map((e)=>{
                                return <>
                                    <td>{!e.status.enonce?<input className="form-check-input" type="checkbox"  disabled></input>:<input type="checkbox" checked disabled></input>}</td>
                                    <td>{!e.status.presence?<input  className="form-check-input" type="checkbox" disabled></input>:<input type="checkbox" checked disabled></input>}</td>
                                    <td>{!e.status.copie?<input  className="form-check-input" type="checkbox" disabled></input>:<input type="checkbox" checked disabled></input>}</td>
                                </>
                            })}
                        </tr>})}
                    </table>
                    :<form>
                        <label className="form-label">id</label>
                        <input onChange={(e)=>setInfo({...info,id:e.target.value})} className="form-control" type="text"></input>
                        <label className="form-label">name</label>
                        <input onChange={(e)=>setInfo({...info,name:e.target.value})} className="form-control" type="text"></input>
                        <select onClick={(e)=>setInfo({...info,type:e.target.value})}>
                            <option value={''} selected disabled>Choisisser type de module</option>
                            <option value={'R'}> Regionale</option>
                            <option value={'L'}>Local</option>
                        </select>
                        <select onClick={(e)=>setInfo({...info,formateur:e.target.value})}>
                            <option value={0}>Choisisser le formateur</option>
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