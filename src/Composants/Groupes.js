import { Link, useNavigate } from "react-router-dom"
import './Menu.css'
import { useState, useEffect } from 'react';
import Menu from "./Menu";
import axios from "axios";
export default function Groupes() {
    const navigate = useNavigate()
    const [filiere, setFiliere] = useState('')
    const [fil, setFil] = useState([])
    const [groupes, setGroupes] = useState([])
    const [grp, setGrp] = useState(false)
    const [info, setInfo] = useState({
        _id: '', filiere: ''
    })
    useEffect(() => {
        axios.get('http://localhost:8080/filiere')
            .then(res => setFil(res.data))
            .catch(err => console.log(err))
    })
    useEffect(() => {
        axios.get(`http://localhost:8080/groupes/${filiere}`)
            .then(res => setGroupes(res.data))
            .catch(err => console.log(err))
    }, [filiere])
    const AjouteGrp = () => {
        if (info._id !== '' && info.filiere !== '') {
            axios.post('http://localhost:8080/groupe/post', info)
                .then(res => alert(res))
                .catch(err => alert(err))
            setGrp(false)
        }
        else {
            alert('write the information !!')
        }
    }
    return (
        <div className="container-fluid">
            <button className="navbar-toggler btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#sidenav" aria-controls="sidenav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">---</span>
            </button>
            <div className="row">
                <Menu page={'Groupes'}/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div>
                        <header>
                            <button type='button' onClick={() => setGrp(!grp)} className='btnt'>Add Groupe</button>
                            <Link to={'/ShowNotifications'}><img style={{ width: '30px' }} src='http://localhost:3000/bell.png'></img></Link>
                        </header>
                        <section>
                            <br></br>
                            <h1 style={{ color: '#0AD1C8' }}>Gestion Groupe</h1>
                            <br></br>
                            {!grp ? <><div className="filter">
                                <select id="grp" className="form-control" style={{width:'50%','margin':'0 auto'}} onClick={(e) => setFiliere(e.target.value)}>
                                    <option value={''}>Choisisser votre filiere</option>
                                    {fil == null ? ''
                                        : fil.map(e => <option>{e.filiere}</option>)}
                                </select>
                            </div>
                                <div className="filter">
                                    {groupes.length > 0 ? groupes.map((e) => {
                                        return <button type="button" style={{ backgroundColor: 'transparent', color: '#152259', margin: '10px' }} onClick={() => navigate(`/Admin/Groupe/${e._id}/Modules`)} className="btns">{e._id}</button>
                                    })
                                        : 'no groupe in this filiere'}
                                </div></>
                                : <form>
                                    <h3 style={{ color: '#152259' }}>Ajoute Groupe</h3>
                                    <label className="form-label">_id</label>
                                    <input type='text' className="form-control" onChange={(e) => setInfo({ ...info, _id: e.target.value })}></input>
                                    <select onClick={(e) => setInfo({ ...info, filiere: e.target.value })} className="form-select">
                                        <option value={''}>Choisisser votre filiere</option>
                                        {fil == null ? ''
                                            : fil.map(e => <option>{e.filiere}</option>)}
                                    </select>
                                    <button type="button" onClick={() => AjouteGrp()}>Ajouter Groupe</button>
                                </form>
                            }
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}