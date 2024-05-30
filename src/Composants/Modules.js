import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import axios from "axios";
import '../App.css';

export default function Modules() {
    const { id } = useParams();
    const [grp, setGrp] = useState({});
    const [module, setModule] = useState(false);
    const navigate = useNavigate()
    const [filiere, setFiliere] = useState({});
    const [formateur, setFormateur] = useState([]);
    const [fomateurs, setFormateurs] = useState([])
    const [info, setInfo] = useState({
        name: "",
        type: '',
        formateur: 0,
        controles: [
            { type: 'cc', enonce: false, status: false, presence: false, copie: false, pv: false, numero_de_controle: 1 },
            { type: 'cc', enonce: false, status: false, presence: false, copie: false, pv: false, numero_de_controle: 2 },
            { type: 'cc', enonce: false, status: false, presence: false, copie: false, pv: false, numero_de_controle: 3 },
            { type: 'efm', enonce: false, status: false, presence: false, copie: false, pv: false, numero_de_controle: 4 }
        ]
    });
    const [names, setNames] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/groupe/${id}`)
            .then(res => setGrp(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/groupe/${id}/formateurs`)
            .then(res => setFormateurs(res.data))
            .catch(err => console.log(err))
    }, [id])

    useEffect(() => {
        if (grp.filiere) {
            axios.get(`http://localhost:8080/filiere/${grp.filiere}`)
                .then(res => setFiliere(res.data))
                .catch(err => console.log(err));
        }
    }, [grp.filiere]);

    useEffect(() => {
        axios.get('http://localhost:8080/formateur')
            .then(res => setFormateur(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const filterNames = grp.Modules ? grp.Modules.map(obj => obj.name) : [];
        setNames(filiere.modules ? filiere.modules.filter(obj => !filterNames.includes(obj.name)) : []);
    }, [grp.Modules, filiere.modules]);

    const addModule = async () => {
        if (info.formateur > 0 && info.name === '') {
            alert('Veuillez vérifier les informations !!');
        } else {
            try {
                let data = info
                if (info.type === 'R') {
                    data.controles[3] = { ...data.controles[3], nom_du_correcteur: '', PV_de_repport: false }
                }
                console.log(data)
                await axios.put(`http://localhost:8080/module/${id}`, data)
                    .then(() => console.log('data created !'))
                    .catch(err => console.log(err))
                navigate(`/Admin/Groupe/${id}/Modules`)
            } catch (err) {
                console.log(err);
            }
        }
    };

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
                            <button type='button' style={{ marginLeft: '10px' }} onClick={() => { setModule(!module); }} className='btnt'>Add Module</button>
                            <Link to={'/ShowNotifications'}><img style={{ width: '30px' }} src='http://localhost:3000/bell.png'></img></Link>
                        </header>
                        <section style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                            <h1 style={{ color: '#0AD1C8' }}>Groupe {grp._id}</h1>
                            {!module ? (
                                <table style={{ marginTop: '20px', width: '100%' }} className="table table-striped table-responsive">
                                    <thead>
                                        <tr>
                                            <th colSpan={3}></th>
                                            <th colSpan={4}>Controle N1</th>
                                            <th colSpan={4}>Controle N2</th>
                                            <th colSpan={4}>Controle N3</th>
                                            <th colSpan={3}>EFM</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Formateur</th>
                                            <th>Module</th>
                                            <th>type</th>
                                            <th>enonce</th>
                                            <th>presence</th>
                                            <th>copie</th>
                                            <th>PV</th>
                                            <th>enonce</th>
                                            <th>presence</th>
                                            <th>copie</th>
                                            <th>PV</th>
                                            <th>enonce</th>
                                            <th>presence</th>
                                            <th>copie</th>
                                            <th>PV</th>
                                            <th>EFM</th>
                                            <th>PV</th>
                                            <th>PV_de_repport</th>
                                            <th>Nom du correcteur</th>
                                        </tr>
                                        {grp.Modules ? grp.Modules.map((e, index) => (
                                            <tr key={index}>
                                                <td>{fomateurs[index]}</td>
                                                <td><h6>{e.name}</h6></td>
                                                <td><h6>{e.type==='R'?'Regional':'Local'}</h6></td>
                                                {e.controles ? e.controles.map((ctrl, ctrlIndex) => {
                                                    if (ctrl.type === 'cc') {
                                                        return (
                                                            <React.Fragment key={ctrlIndex}>
                                                                <td>{!ctrl.enonce ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                                <td>{!ctrl.presence ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                                <td>{!ctrl.copie ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                                <td>{!ctrl.pv ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                            </React.Fragment>
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <React.Fragment key={ctrlIndex}>
                                                                <td>{!ctrl.status ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                                <td>{!ctrl.pv ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                                {e.type === 'R' ?
                                                                    !ctrl.PV_de_repport ? <td><input type="checkbox" disabled /></td> : <td> <input type="checkbox" checked disabled className="checkbox" /></td>
                                                                    : <td></td>
                                                                }
                                                                {e.type === 'R' ? <td><h6>{ctrl.nom_du_correcteur}</h6></td> : <td></td>}
                                                            </React.Fragment>
                                                        )
                                                    }
                                                }) : null}
                                            </tr>
                                        )) : null}
                                    </tbody>
                                </table>
                            ) : (
                                <form style={{ width: '100%' }} >
                                    <label className="form-label">name</label>
                                    <select onClick={(e) => {
                                        if (e.target.value) {
                                            const values = JSON.parse(e.target.value)
                                            setInfo({ ...info, name: values.name, type: values.type })
                                        }
                                    }}>
                                        <option value={''} >Choisisser un module</option>
                                        {names.map((e, index) => (
                                            <option key={index} value={JSON.stringify({ name: e.name, type: e.type })}>{e.name}</option>
                                        ))}
                                    </select>
                                    <select onChange={(e) => setInfo({ ...info, formateur: e.target.value })}>
                                        <option value={0} >Choisisser le formateur</option>
                                        {formateur.map((e, index) => (
                                            <option key={index} value={e._id}>{e.name}</option>
                                        ))}
                                    </select>
                                    <button type="button" onClick={addModule}>Ajouter Module</button>
                                </form>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
