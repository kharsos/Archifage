import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Menu from "./Menu"
import axios from "axios"
export default function GestionFiliere() {
    const [filiere, setFiliere] = useState([])
    const [form, setForm] = useState(false)
    const [info, setInfo] = useState({
        filiere: '',
        modules: []
    })
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:8080/filiere')
            .then(res => setFiliere(res.data))
            .catch(err => console.log(err))
    },[])
    const AjouterFiliere = () => {
        axios.post('http://localhost:8080/post/filiere', info)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        setForm(false)
    }
    return (
        <div className="container-fluid">
            <button className="navbar-toggler btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#sidenav" aria-controls="sidenav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon">---</span>
            </button>
            <div className="row">
                <Menu page={'Filiere'}/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div>
                        <header>
                            <div>
                                <button type='button' className='btnt' onClick={() => setForm(!form)}>Ajouter Filiere</button>
                            </div>
                            <div>
                                <Link to={'/ShowNotifications'}><img style={{ width: '30px' }} src='http://localhost:3000/bell.png'></img></Link>
                            </div>
                        </header>
                        <section>
                            <br></br>
                            <h1 style={{ color: '#0AD1C8' }}>Gestion Filiere</h1>
                            <br></br>
                            {!form ? <div className="filter">
                                {filiere != null ? filiere.map((e) => {
                                    return <button type="button" style={{ backgroundColor: 'transparent', color: '#152259', margin: '10px', padding: '10px 10px', height: 'auto' }} onClick={() => navigate(`/GestionFiliere/${e._id}`)} className="btns">{e.filiere}</button>
                                })
                                    : ''}
                            </div>
                                : <form>
                                    <label className="form-label">Filiere :</label>
                                    <input type="text" onChange={(e) => setInfo({ ...info, filiere: e.target.value })} placeholder="ecriver le nom du filiere"></input>
                                    <button type="button" onClick={() => AjouterFiliere()}>Ajouter filiere</button>
                                </form>
                            }
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}