import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import ArchivageChart from "./ArchivageChart";
import Menu from "./Menu";
import './popup.css'
export default function Statistique() {
    const [data, setData] = useState([])
    const [teachers, setTeachers] = useState([])
    const [teacherId, setTeacherId] = useState(0)
    const [showChart, setShowChart] = useState(false)
    const [teacherData, setTeacherDate] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/groupes/modules/percentage')
            .then(res => setData(res.data))
            .catch(err => console.log(err))
        axios.get('http://localhost:8080/formateur')
            .then(res => setTeachers(res.data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        if (teacherId != 0) {
            setShowChart(true)
            axios.get(`http://localhost:8080/Modules_formateur/${teacherId}`)
                .then(res => {
                    setTeacherDate(res.data)
                })
                .catch(err => console.log(err))
        }
        else {
            setShowChart(false)
        }
    }, [teacherId])
    return <div className="container-fluid">
        <button className="navbar-toggler btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#sidenav" aria-controls="sidenav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon">---</span>
        </button>
        <div className="row">
            <Menu />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div>
                    <header>
                        <div>
                            <button type='button' className='btnb'>Statistique Archivage</button>
                        </div>
                        <div>
                            <Link to={'/ShowNotifications'}><img style={{ width: '30px' }} src='http://localhost:3000/bell.png'></img></Link>
                        </div>
                    </header>
                    <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <div>
                            <h1>All   </h1>
                            <ArchivageChart data={data} />
                            <br></br>
                            <div>
                                <select onClick={(e) => setTeacherId(e.target.value)}>
                                    <option value={0}>Choisisser un formateur</option>
                                    {
                                        teachers.map(formateur => <option value={formateur._id}>{formateur._id} - {formateur.name}</option>)
                                    }
                                </select>
                                {showChart && teacherId != 0 ? <>
                                    <h1>{teachers.filter(e => e._id == teacherId)[0].name}</h1>
                                    <ArchivageChart data={teacherData} />
                                </>
                                    : ''
                                }
                            </div>

                        </div>
                    </section>

                </div>
            </main>
        </div>
    </div>
}