import { Link , useParams} from "react-router-dom";
import { useEffect , useState } from "react";
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
        <div>
    <nav className="nav">
       <img src='http://localhost:3000/ofppt.png' alt="logo"></img>
       <h2 style={{color:'white'}}>NTIC SYBA</h2>
       <hr></hr>
       <Link to={'/GestionFormateur'}><button type='button' style={{backgroundColor:'transparent',border:'none'}} className="btns"><img src="http://localhost:3000/home.png" alt="home"></img><span>Formateur</span></button></Link>
       <Link to={'/Admin/Groupes'}><button type='button' className="btns" style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3000/graduate.png" alt="graduate"></img><span>Groupes</span></button></Link>
       <Link to={'/GestionFiliere'}><button type='button' className='btns' ><img src="http://localhost:3000/book.png" alt="book"></img><span>Filieres</span></button></Link>
   </nav>
   <div className="split">
        <header>
            <div>
                <button type='button' className='btnb'>Export CSV</button>
            </div>
            <div>
            <Link to={'/ShowNotifications'}><img style={{width:'30px'}} src='http://localhost:3000/bell.png'></img></Link>
            <button type='button' className='btnb'>Log out</button>
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
    )
}