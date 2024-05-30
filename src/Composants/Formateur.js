import { Link, useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Menu2 from "./Menu2"
export default function Formateur() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formateur, setFormateur] = useState({})
    const [filieres, setFilieres] = useState([])
    const [teaching, setTeaching] = useState([])
    const [ChosenFiliere, setChosenFiliere] = useState('')
    const [ChosenModule, setChosenModule] = useState('')
    const [ChosenGroupe, setChosenGroupe] = useState('')
    const [modules, setModules] = useState([])
    const [groupes, setGroupes] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [groupe, setGroupe] = useState({})
    const [nomDuCorrecteur, setNomDuCorrecteur] = useState('')
    const [Controles, setControles] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        console.log(Controles)
        console.log(teaching)
    }, [Controles])
    useEffect(() => {
        axios.get(`http://localhost:8080/formateur/${id}`)
            .then(res => setFormateur(res.data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:8080/Modules_formateur/${id}`)
            .then(res => {
                setTeaching(res.data)
                res.data.map(async (group) => {
                    if (!filieres.includes(group.filiere)) {
                        setFilieres([...filieres, group.filiere])
                    }
                })
            })
            .catch(err => console.log(err))
    }, [refresh])
    useEffect(() => {
        setModules([])
        teaching.map(async (e) => {
            if (e.filiere == ChosenFiliere) {
                if (!modules.includes(e.Modules.name)) {
                    setModules(prevElem => [...prevElem, e.Modules.name])
                }
            }
        })
    }, [ChosenFiliere])
    useEffect(() => {
        setGroupes([])
        teaching.map(e => {
            if (e.Modules.name == ChosenModule && e.filiere == ChosenFiliere) {
                if (!groupes.includes(e._id)) {
                    setGroupes(prev => [...prev, e._id])
                    console.log(`teaching ${teaching}`)

                }
            }
        })
        setChosenGroupe(() => '')
    }, [ChosenModule, ChosenFiliere])
    useEffect(() => {
        if (ChosenGroupe === '') {
            setShowTable(false)
        }
        else {
            setShowTable(true)
            teaching.map(element => {
                if (element._id === ChosenGroupe && element.Modules.name === ChosenModule) {
                    setGroupe(element)
                    setNomDuCorrecteur(element.Modules.controles[3].nom_du_correcteur)
                    setControles(element.Modules.controles)

                }
            })
        }
    }, [ChosenGroupe, teaching])
    const checkBoxChangeHandle = (id, property) => {
        setControles(prevControles => {
            return prevControles.map((control, i) => {
                if (i === id) {
                    if (control.type === 'efm' && groupe.Modules.type === 'R') {
                        return { ...control, [property]: !control[property], nom_du_correcteur: nomDuCorrecteur };
                    }
                    return { ...control, [property]: !control[property] };
                }
                return control;
            });
        });
    };

    const archiver = async (index) => {
        let body = {}
        if (Controles[index].enonce && Controles[index].presence && Controles[index].copie && Controles[index].pv) {
            body = { ...Controles[index], status: true, type: groupe.Modules.type }
        }
        else {
            body = { ...Controles[index], type: groupe.Modules.type }
        }
        console.log(body)
        await axios.put(`http://localhost:8080/Modules_formateur/${ChosenGroupe}/${ChosenModule}`, body)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setRefresh(!refresh)
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
                        <button type='button' className='btnb'>{formateur.name}</button>
                    </div>
                </header>
                <section>
                    <h1 style={{ color: '#0AD1C8' }}>Archivage de Controles</h1>
                    <div className="container" style={{ marginTop: '20px' , display:'flex' }}>
                        <select id="filiere" style={{ margin: '0px 10px' }} className="form-control" onClick={(e) => setChosenFiliere(e.target.value)}>
                            <option  selected value={''}>Choisisser la filere</option>
                            {filieres.map((f, i) => <option value={f} key={i}>{f}</option>)}
                        </select>
                        <select id="module" style={{ margin: '0px 10px' }} className="form-control" onClick={(e) => { setChosenModule(e.target.value) }}>
                            <option  selected value={''}>Choisisser le module</option>
                            {modules.map((m, i) => <option value={m} key={i}>{m}</option>)}
                        </select>
                        <select id="grp" style={{ margin: '0px 10px' }} className="form-control" onClick={(e) => { setChosenGroupe(e.target.value) }}>
                            <option  selected value={''}>Choisisser le groupe</option>
                            {groupes.map((g, i) => <option value={g} key={i}>{g}</option>)}
                        </select>
                    </div>
                    {showTable ?
                        <div className="filter" style={{ marginTop: '20px' }}>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th colSpan={2}>{ChosenModule}</th>
                                        <th>enonce</th>
                                        <th>presence</th>
                                        <th>copie</th>
                                        <th>PV</th>
                                        {groupe.Modules.type === 'R' ? <th>PV_de_repport</th> : ''}

                                        <th colSpan={10}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupe ?
                                        groupe.Modules.controles.map((cntrl, index) =>
                                            <tr>
                                                <td colSpan={2}>{cntrl.type === 'cc' ? `Controle N ${cntrl.numero_de_controle}` : `EFM`}</td>
                                                <td>{!cntrl.enonce ? <input type="checkbox" onChange={() => checkBoxChangeHandle(index, 'enonce')} />
                                                    : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                <td>{!cntrl.presence ? <input type="checkbox" onChange={() => checkBoxChangeHandle(index, 'presence')} />
                                                    : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                <td>{!cntrl.copie ? <input type="checkbox" onChange={() => checkBoxChangeHandle(index, 'copie')} />
                                                    : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                <td>{!cntrl.pv ? <input type="checkbox" onChange={() => checkBoxChangeHandle(index, 'pv')} />
                                                    : <input type="checkbox" checked disabled className="checkbox" />}</td>
                                                <td>
                                                    {groupe.Modules.type === 'R' && cntrl.type === 'efm' ?
                                                        !cntrl.PV_de_repport ? <input type="checkbox" onChange={() => checkBoxChangeHandle(index, 'PV_de_repport')} />
                                                            : <input type="checkbox" checked disabled className="checkbox" />
                                                        : ''
                                                    }
                                                </td>
                                                <td>
                                                    {cntrl.type === 'cc' ?
                                                        cntrl.enonce && cntrl.presence && cntrl.copie && cntrl.pv ?
                                                            <button type="button" disabled className="btn btn-outline-success">Archiver</button>
                                                            : <button type="button" className="btn btn-outline-success" onClick={() => archiver(index)}>Archiver</button>

                                                        :
                                                        <>
                                                            {
                                                                cntrl.enonce && cntrl.presence && cntrl.copie && cntrl.pv ? <>
                                                                    {groupe.Modules.type === 'R' ? <input type="text" disabled className="form-control" placeholder="nom du correcteur" onChange={(e) => setNomDuCorrecteur(e.target.value)} required></input> : ''}
                                                                    <button type="button" disabled className="btn btn-outline-success">Archiver</button>
                                                                </>
                                                                    : <>
                                                                        {groupe.Modules.type === 'R' ?
                                                                            <input type="text" className="form-control" placeholder="nom du correcteur" onChange={(e) => {
                                                                                setNomDuCorrecteur(e.target.value)
                                                                                checkBoxChangeHandle(index)
                                                                            }}
                                                                                value={nomDuCorrecteur != '' ? nomDuCorrecteur : ''}
                                                                                required></input>
                                                                            : ''
                                                                        }
                                                                        <button type="button" className="btn btn-outline-success" onClick={() => archiver(index)}>Archiver</button>
                                                                    </>
                                                            }

                                                        </>
                                                    }

                                                </td>
                                            </tr>
                                        )
                                        : ''}
                                </tbody>
                            </table>
                        </div>
                        : ''}
                </section>
            </main>
        </div>
    </div>
}