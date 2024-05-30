import { Link , useParams} from "react-router-dom";
import { useEffect , useState } from "react";
import Menu from "./Menu";
import axios from "axios";
export default function AjouterModule(){
    const [filiere,setFiliere] = useState({})
    const [modules,setModules]=useState([])
    const [info,setInfo]=useState({
        id:'',
        name:'',
        type:''
    })
    const {id} = useParams()
    useEffect(()=>{
        axios.get(`http://localhost:8080/get/${id}`)
        .then(res=>{
            setFiliere(res.data)
            setModules(res.data.modules)
        })
        .catch(err=>console.log(err))
    },[filiere])
    const AjouterModule = () =>{
        if(info.id==''|| info.name==''||info.type==''){
            alert('evriver tous les informatiion')
        }
        else{
            axios.put(`http://localhost:8080/post/module/${id}`,info)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
        }
    }
    return(
        <div className="container-fluid">
    <button className="navbar-toggler btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#sidenav" aria-controls="sidenav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">---</span>
    </button>
    <div className="row">
    <Menu />
   <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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
            <br></br>
            <h1 style={{color:'#0AD1C8'}}>{filiere.filiere}</h1>
            <br></br>
            <table className="table table-striped">
                <thead>
                    <th>id</th>
                    <th>Module</th>
                    <th>type</th>
                </thead>
                <tbody>
                    {filiere===null?'':modules.map(e=><tr>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.type}</td>
                    </tr>)}
                    <tr>
                        <td><input onChange={(e)=>setInfo({...info,id:e.target.value})} className="form-control" placeholder="evriver id" type='text'></input></td>
                        <td><input onChange={(e)=>setInfo({...info,name:e.target.value})} className="form-control" placeholder="ecriver nom du module" type="text"></input></td>
                        <td>
                            <select onClick={(e)=>setInfo({...info,type:e.target.value})} className="form-control">
                                <option value={''}>choisir le type</option>
                                <option value={'R'}>Regionale</option>
                                <option value={'L'}>Local</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}></td>
                        <td><button type="button" onClick={()=>AjouterModule()}>Ajouter Module</button></td>
                    </tr>
                </tbody>
            </table>
        </section>
   </div>
</div>
</div>
    )
}