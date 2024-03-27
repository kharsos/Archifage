import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import '../App.css'
import './Menu.css'
import axios from 'axios';
function GestionFormateur(){
    const [formateur,setFormateur] = useState([])
    const [form,setForm]=useState(false)
    const navigate = useNavigate()
    const [teacher,setTeacher]=useState(
        {
            name:'',
            email:'',
            password:'',
            type:'formateur',
            gendre:''
        }
    )
    useEffect(()=>{
        axios.get('http://localhost:8080/formateur')
        .then(res=>setFormateur(res.data))
        .catch(err=>console.log(err))
    })

    const teacherdate = () =>{
        if(teacher.email!==''&&teacher.gendre!==''&&teacher.name!==''&&teacher.password!==''){
            axios.post('http://localhost:8080/post',teacher)
            .then(()=>console.log('data created !'))
            .catch(()=>console.log('data uncreated'))
            setForm(false)
        }
        else{
            alert('please write the information correctly !!')
            console.log(teacher)
        }
    }

    const deleteTeacher = (id) =>{
        axios.delete(`http://localhost:8080/delete/${id}`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    return(
        <div>
            <nav className="nav">
                <img src='ofppt.png' alt="logo"></img>
                <h2 style={{color:'white'}}>NTIC SYBA</h2>
                <hr></hr>
                <button type='button' className="btns"><img src="http://localhost:3000/home.png" alt="formateur"></img><span>Formateur</span></button>
                <Link to={'/Admin/Groupes'}><button type='button' className="btns" style={{backgroundColor:'transparent',border:'none'}}><img src="graduate.png" alt="graduate"></img><span>Groupes</span></button></Link>
                <Link to={'/GestionFiliere'}><button type='button' className='btns' style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3000/book.png" alt="book"></img><span>Filieres</span></button></Link>
            </nav>
            <div className='split'>
                <header>
                    <div>
                        <button type='button' className='btnb'>Export CSV</button>
                        <button type='button' className='btnt' onClick={()=>setForm(!form)}>Ajouter Formateur</button>
                    </div>
                    <div>
                    <Link to={'/ShowNotifications'}><img style={{width:'30px'}} src='http://localhost:3000/bell.png'></img></Link>
                    <button type='button' className='btnb'>Log out</button>
                    </div>
                </header>
                <section>
                    <br></br>
                    <h1 style={{color:'#0AD1C8'}}>Gestion Formateur</h1>
                    <br></br>
                    {!form?<>
                    <div>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Adresse</th>
                                <th>Gender</th>
                                <th colSpan={2}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {formateur.map(e=><tr>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.gendre}</td>
                                <td><button className='btn btn-success' onClick={()=>navigate(`/Admin/modifier_formateur/${e._id}`)}>Modifier</button></td>
                                <td><button className='btn btn-danger' onClick={()=>deleteTeacher(e._id)}>Supprimer</button></td>
                                <td><button className='btn btn-light' onClick={()=>navigate(`/AffecterFormateur/${e._id}`)}>+</button></td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                    </>:
                    <>
                        <form>
                            <label className='form-label'>Name</label>
                            <input onChange={(e)=>setTeacher({...teacher,name:e.target.value})} type='text' className='form-control'></input>
                            <label className='form-label'>email</label>
                            <input onChange={(e)=>setTeacher({...teacher,email:e.target.value})} type='email' className='form-control'></input>
                            <label className='form-label'>password</label>
                            <input onChange={(e)=>setTeacher({...teacher,password:e.target.value})} type='password' className='form-control'></input>
                            <select  onClick={(e)=>setTeacher({...teacher,gendre:e.target.value})}>
                                <option value={''}>your gender</option>
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                            </select>
                            <button type='button' onClick={()=>teacherdate()}>Ajouter</button>
                        </form>
                    </>
                    } 
                </section>
            </div>
        </div>
    )
}

export default GestionFormateur;