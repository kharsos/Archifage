import { useParams , Link} from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";
export default function Modules(){
    const {id}=useParams()
    const [grp,setGrp]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8080/groupe/${id}`)
        .then(res=>setGrp(res.data))
        .catch(err=>console.log(err))
    })
    return(
        <div>
             <nav className="nav">
                <img src='ofppt.png' alt="logo"></img>
                <h2 style={{color:'white'}}>NTIC SYBA</h2>
                <hr></hr>
                <Link to={'/login'}><button type='button' style={{backgroundColor:'transparent',border:'none'}} className="btns"><img src="home.png" alt="home"></img><span>Teachers</span></button></Link>
                <button type='button' className="btns" ><img src="graduate.png" alt="home"></img><span>Groupes</span></button>
            </nav>
            <div className="split">
                <header>
                    <button type='button' style={{marginLeft:'10px'}} onClick={()=>setGrp(true)} className='btnt'>Add Groupe</button>
                    <button type='button' className='btnb'>Log out</button>
                </header>
            </div>
        </div>
    )
}