import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import Menu from './Menu';
import '../App.css'
import './Menu.css'
import axios from 'axios';
function GestionFormateur() {
    const [formateur, setFormateur] = useState([])
    const [form, setForm] = useState(false)
    const navigate = useNavigate()
    const [teacher, setTeacher] = useState(
        {
            name: '',
            email: '',
            password: '',
            type: 'formateur',
            gendre: ''
        }
    )
    useEffect(() => {
        axios.get('http://localhost:8080/formateur')
            .then(res => setFormateur(res.data))
            .catch(err => console.log(err))
    },[])

    const teacherdate = () => {
        if (teacher.email !== '' && teacher.gendre !== '' && teacher.name !== '' && teacher.password !== '') {
            axios.post('http://localhost:8080/post', teacher)
                .then(() => console.log('data created !'))
                .catch(() => console.log('data uncreated'))
            setForm(false)
        }
        else {
            alert('please write the information correctly !!')
            console.log(teacher)
        }
    }

    const deleteTeacher = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div className="container-fluid">
            <button className="navbar-toggler btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#sidenav" aria-controls="sidenav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">---</span>
            </button>
            <div className="row">
                <Menu />
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div>
                        <header>
                            <div>
                                <button type='button' className='btnb'><CSVLink data={formateur}>Export CSV</CSVLink> </button>
                                <button type='button' className='btnt' onClick={() => setForm(!form)}>Ajouter Formateur</button>
                            </div>
                            <div>
                                <Link to={'/ShowNotifications'}><img style={{ width: '30px' }} src='http://localhost:3000/bell.png'></img></Link>
                            </div>
                        </header>
                        <section>
                            <br></br>
                            <h1 style={{ color: '#0AD1C8' }}>Gestion Formateur</h1>
                            <br></br>
                            {!form ? <>
                                <div>
                                    <table style={{ marginTop: '20px', width: '100%' }} className="table table-striped">   
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email Adresse</th>
                                                <th>Gender</th>
                                                <th colSpan={2}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formateur.map(e => <tr>
                                                <td>{e.name}</td>
                                                <td>{e.email}</td>
                                                <td>{e.gendre}</td>
                                                <td><button className='btn btn-outline-success' onClick={() => navigate(`/Admin/modifier_formateur/${e._id}`)}>Modifier</button></td>
                                                <td><button className='btn btn-outline-danger' onClick={() => deleteTeacher(e._id)}>Supprimer</button></td>
                                                <td><button className='btn btn-dark' onClick={() => navigate(`/AffecterFormateur/${e._id}`)}>+</button></td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </> :
                                <>
                                    <form id='form'>
                                        <label className='form-label'>Name</label>
                                        <input onChange={(e) => setTeacher({ ...teacher, name: e.target.value })} type='text' className='form-control'></input>
                                        <label className='form-label'>email</label>
                                        <input onChange={(e) => setTeacher({ ...teacher, email: e.target.value })} type='email' className='form-control'></input>
                                        <label className='form-label'>password</label>
                                        <input onChange={(e) => setTeacher({ ...teacher, password: e.target.value })} type='password' className='form-control'></input>
                                        <select onClick={(e) => setTeacher({ ...teacher, gendre: e.target.value })}>
                                            <option value={''}>your gender</option>
                                            <option value={'Male'}>Male</option>
                                            <option value={'Female'}>Female</option>
                                        </select>
                                        <button type='button' onClick={() => teacherdate()}>Ajouter</button>
                                    </form>
                                </>
                            }
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default GestionFormateur;