import { useEffect , useState } from "react";
import { useNavigate ,useParams ,Link} from "react-router-dom";
import axios from "axios";
import ArchivageChart from "../ArchivageChart";
import './popup.css'
export default function Statistique(){
    const [data,setData]=useState([])
    const [teacherData,setTeacherDate]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/groupes/modules/percentage')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
      },[])
      useEffect(()=>{
        axios.get(`http://localhost:8080/Modules_formateur/3`)
        .then(res=>{
            setTeacherDate(res.data)
        })
        .catch(err=>console.log(err))
    },[])
    return  <div>
    <nav className="nav">
       <img src='http://localhost:3000/ofppt.png' alt="logo"></img>
       <h2 style={{color:'white'}}>NTIC SYBA</h2>
       <hr></hr>
       <Link to={'/GestionFormateur'}><button type='button' style={{backgroundColor:'transparent',border:'none'}} className="btns"><img src="http://localhost:3000/home.png" alt="home"></img><span>Formateur</span></button></Link>
       <button type='button' className="btns" ><img src="http://localhost:3000/graduate.png" style={{backgroundColor:'transparent',border:'none'}} alt="home"></img><span>Groupes</span></button>
       <Link to={'/GestionFiliere'}><button type='button' className='btns' style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3001/book.png" alt="book"></img><span>Filieres</span></button></Link>
       <Link to={'/statistique'}><button type='button' className='btns' ><img src="http://localhost:3001/book.png" alt="book"></img><span>Statistique</span></button></Link>
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
        <section style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <div>
                <h1>Chart for all   </h1>
                <ArchivageChart data={data}/>
            </div>
            {/* <div>
                <h1>Chart for a teacher</h1>
                <ArchivageChart data={teacherData}/>
            </div> */}
            
        </section>
        
   </div>
    
</div>

}