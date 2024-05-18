import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Menu from "./Menu";
import axios from "axios";

export default function Modules() {
    const { id } = useParams();
    const [grp, setGrp] = useState({});
    const [module, setModule] = useState(false);
    const [filiere, setFiliere] = useState({});
    const [formateur, setFormateur] = useState([]);
    const [fomateurs, setFormateurs] = useState([])
    const [info, setInfo] = useState({
        name: "",
        formateur: 0,
        controles: [
            { type: 'cc', enonce: false, status: false, presence: false, copie: false, pv: false, numero_de_controle: 1 },
            { type: 'cc', enonce: false, status: false, presence: false, copie: false, pv: false, numero_de_controle: 2 },
            { type: 'cc', enonce: false, status: false, presence: false, copie: false, pv: false, numero_de_controle: 3 },
            { type: 'efm', enonce: false, status: false, presence: false, copie: false, pv: false, nom_du_correcteur: '', numero_de_controle: 4 }
        ]
    });
    const [names, setNames] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/groupe/${id}`)
            .then(res => setGrp(res.data))
            .catch(err => console.log(err));
        axios.get(`http://localhost:8080/groupe/${id}/formateurs`)
            .then(res => setFormateurs(res.data))
            .catch(err => console.log(err))
    }, [id]);

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
                await axios.put(`http://localhost:8080/module/${id}`, info);
                console.log('Données créées !');
                setModule(!module)
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div>
            <Menu />
            <div className="split">
                <header>
                    <button type='button' style={{ marginLeft: '10px' }} onClick={() => { setModule(!module); }} className='btnt'>Add Module</button>
                    <Link to={'/'}>
                        <button type='button' className='btnb'>Log out</button>
                    </Link>
                </header>
                <section style={{display:'flex',flexDirection:'column',alignContent:'center'}}>
                    <h1 style={{ color: '#0AD1C8' }}>Groupe {grp._id}</h1>
                    {!module ? (
                        <table style={{ marginTop: '20px',width:'100%' }} className="table table-striped">
                            <thead>
                                <tr>
                                    <th colSpan={2}></th>
                                    <th colSpan={4}>Controle N1</th>
                                    <th colSpan={4}>Controle N2</th>
                                    <th colSpan={4}>Controle N3</th>
                                    <th>EFM</th>
                                    <th>PV</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Formateur</th>
                                    <th>Module</th>
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
                                    <th colSpan={3}></th>
                                </tr>
                                {grp.Modules ? grp.Modules.map((e, index) => (
                                    <tr key={index}>
                                        <td>{fomateurs[index]}</td>
                                        <td><h6>{e.name}</h6></td>
                                        {e.controles ? e.controles.map((ctrl, ctrlIndex) => {
                                            if (ctrl.type === 'cc') {
                                                return (
                                                    <React.Fragment key={ctrlIndex}>
                                                        <td>{!ctrl.enonce ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled />}</td>
                                                        <td>{!ctrl.presence ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled />}</td>
                                                        <td>{!ctrl.copie ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled />}</td>
                                                        <td>{!ctrl.pv ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled />}</td>
                                                    </React.Fragment>
                                                )
                                            }
                                            else {
                                                return (
                                                    <React.Fragment key={ctrlIndex}>
                                                        <td>{!ctrl.enonce ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled />}</td>
                                                        <td>{!ctrl.pv ? <input type="checkbox" disabled /> : <input type="checkbox" checked disabled />}</td>
                                                    </React.Fragment>
                                                )
                                            }
                                        }) : null}
                                    </tr>
                                )) : null}
                            </tbody>
                        </table>
                    ) : (
                        <form>
                            <label className="form-label">name</label>
                            <select onChange={(e) => setInfo({ ...info, name: e.target.value })}>
                                <option value={''} disabled>Choisisser un module</option>
                                {names.map((e, index) => (
                                    <option key={index} value={e.name}>{e.name}</option>
                                ))}
                            </select>
                            <select onChange={(e) => setInfo({ ...info, formateur: e.target.value })}>
                                <option value={0} disabled>Choisisser le formateur</option>
                                {formateur.map((e, index) => (
                                    <option key={index} value={e._id}>{e.name}</option>
                                ))}
                            </select>
                            <button type="button" onClick={addModule}>Ajouter Module</button>
                        </form>
                    )}
                </section>
            </div>
        </div>
    );
}
