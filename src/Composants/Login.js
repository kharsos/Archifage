import React from 'react'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import './Menu.css'
import axios from 'axios';
function Login(){
    const [formateur,setFormateur] = useState([])
    const [form,setForm]=useState(false)
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
    return(
        <div>
            <nav className="nav">
                <img src='ofppt.png' alt="logo"></img>
                <h2 style={{color:'white'}}>NTIC SYBA</h2>
                <hr></hr>
                <button type='button' className="btns"><img src="home.png" alt="home"></img><span>Teachers</span></button>
                <Link to={'/Admin/Groupes'}><button type='button' className="btns" style={{backgroundColor:'transparent',border:'none'}}><img src="graduate.png" alt="home"></img><span>Groupes</span></button></Link>
            </nav>
            <div className='split'>
                <header>
                    <div>
                        <button type='button' className='btnb'>Export CSV</button>
                        <button type='button' className='btnt' onClick={()=>setForm(!form)}>Add Teacher</button>
                    </div>
                    <button type='button' className='btnb'>Log out</button>
                </header>
                <section>
                    {!form?<>
                    <input type='text' placeholder='search for a teacher by email'></input>
                    <div>
                        <table className="table table-stripped table-primary">
                            <tr>
                                <th>Name</th>
                                <th>Email Adresse</th>
                                <th>Gender</th>
                            </tr>
                            {formateur.map(e=><tr>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.gendre}</td>
                            </tr>)}
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

export default Login;