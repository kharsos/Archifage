import axios from 'axios';
import { useState, useEffect } from 'react';
import CopiesChart from './CopiesChart';
import Menu2 from './Menu2';
import { Link } from 'react-router-dom';
export default function Notifications() {
    const [notification, setNotification] = useState([])
    const [form, setForm] = useState(false)
    const [formateur, setFormateur] = useState([])
    const [chosenFormateur, setChosenFormateur] = useState(0)
    const [teaching, setTeaching] = useState([])
    const [filieres, setFilieres] = useState([])
    const [modules, setModules] = useState([])
    const [groupes, setGroupes] = useState([])
    const [data, setData] = useState([])
    const [info, setInfo] = useState({
        formateur: '',
        Module: '',
        filiere: '',
        Groupe: '',
        copie: 0
    })
    useEffect(() => {
        axios.get('http://localhost:8080/formateur')
            .then(res => setFormateur(res.data))
            .catch(err => console.log(err))
    }, [])


    useEffect(() => {
        axios.get(`http://localhost:8080/notifications/groupe`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/notification')
            .then(res => setNotification(res.data))
            .catch(err => console.log(err))
    }, [form])
    useEffect(() => {
        axios.get(`http://localhost:8080/Modules_formateur/${chosenFormateur}`)
            .then(res => {
                setTeaching(res.data)
                res.data.map(async (group) => {
                    if (!filieres.includes(group.filiere)) {
                        setFilieres([...filieres, group.filiere])
                    }
                })
            })
            .catch(err => console.log(err))
        console.log(chosenFormateur)
        console.log(teaching)
        setFilieres([])
        setModules([])
        setGroupes([])
    }, [chosenFormateur])
    useEffect(() => {
        teaching.map(async (e) => {
            if (e.filiere === info.filiere) {
                if (!modules.includes(e.Modules.name)) {
                    setModules(prevElem => [...prevElem, e.Modules.name])
                }
            }
        })
    }, [info.filiere])
    useEffect(() => {
        teaching.map(e => {
            if (e.Modules.name === info.Module) {
                if (!groupes.includes(e._id)) {
                    setGroupes([...groupes, e._id])
                    console.log(`teaching ${teaching}`)

                }
            }
        })
    }, [info.Module])
    const Ajouter_Notification = async () => {
        await axios.post('http://localhost:8080/post/notification', info)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setForm(false)
    }
    return <div className="container-fluid">
    <button className="navbar-toggler btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#sidenav" aria-controls="sidenav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">---</span>
    </button>
    <div className="row">
        <Menu2 />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <header>
                    <div>
                        <button type='button' className='btnt' onClick={() => setForm(!form)}>Ajouter Notification</button>
                    </div>
                </header>
                <section>
                    {!form ? <div className='notif'>

                        <table className='table table-striped '>
                            <thead>
                                <tr>
                                    <th>formateur</th>
                                    <th>Module</th>
                                    <th>Groupe</th>
                                    <th>Filiere</th>
                                    <th>Nombre de copie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    notification.map(e => <tr>
                                        <td>{e.formateur}</td>
                                        <td>{e.Module}</td>
                                        <td>{e.Groupe}</td>
                                        <td>{e.filiere}</td>
                                        <td>{e.copie}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                        : <form>
                            <label className='form-label'>Formateur</label>
                            <select onClick={(e) => {
                                if (e.target.value) {
                                    const selectedValue = JSON.parse(e.target.value);
                                    setInfo({ ...info, formateur: selectedValue.name })
                                    setChosenFormateur(selectedValue.id)
                                }
                            }}>
                                <option value={''}>Choisir le formateur</option>
                                {formateur.map(e => <option value={JSON.stringify({ name: e.name, id: e._id })}>{e.name}</option>)}
                            </select>
                            <label className='form-label'>Filiere</label>
                            <select onClick={(e) => setInfo({ ...info, filiere: e.target.value })}>
                                <option value={''} disabled selected>Choisissez une filiere</option>
                                {filieres.map(e => <option value={e}>{e}</option>)}
                            </select>
                            <label className='form-label'>Module</label>
                            <select onClick={e => setInfo({ ...info, Module: e.target.value })}>
                                <option value={''} disabled selected>Choisissez un module</option>
                                {modules.map(e => <option value={e}>{e}</option>)}

                            </select>
                            <label className='form-label'>Groupe</label>
                            <select onClick={e => setInfo({ ...info, Groupe: e.target.value })}>
                                <option value={''} disabled selected>Choisissez un groupe</option>
                                {groupes.map(e => <option value={e}>{e}</option>)}

                            </select>
                            <label className='form-label'>Nombre de copie</label>
                            <input type='number' onChange={(e) => setInfo({ ...info, copie: e.target.value })}></input>
                            <button type='button' onClick={() => Ajouter_Notification()} >Ajouter Notification</button>
                        </form>}
                    <CopiesChart />
                </section>
            </main>
        </div>
    </div>
}