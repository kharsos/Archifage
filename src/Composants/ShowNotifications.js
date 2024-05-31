import axios from 'axios';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import CopiesChart from './CopiesChart';
export default function ShowNotification(){
    const [notification,setNotification]=useState([])
    // const [formateur,setFormateur]=useState([])
    // const [chosenFormateur,setChosenFormateur]=useState('')
    const [Statistique,setStatistique]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/notification')
        .then(res=>setNotification(res.data))
        .catch(err=>console.log(err))

        // axios.get('http://localhost:8080/formateur')
        // .then(res=>setFormateur(res.data))
        // .catch(err=>console.log(err))
    },[])

//     useEffect(()=>{
//         axios.get(`http://localhost:8080/notifications/groupe/${chosenFormateur}`)
//         .then(res=>setStatistique(res.data))
//         .catch(err=>console.log(err))
//         console.log(Statistique)
//   },[chosenFormateur])

    return<div>
        <Menu />
        <div className='split'>
                <header>
                    <div>
                        <button type='button' className='btnb'>Export CSV</button>
                    </div>
                    <div>
                    <Link to={'/ShowNotifications'}><img style={{width:'30px'}} src='http://localhost:3000/bell.png'></img></Link>
                    <Link to={'/'}><button type='button' className='btnb'>Log out</button></Link>
                    </div>
                </header>
                <section>
                    <h1 style={{color:'#152259'}}>Copies</h1>
                    <div className='notif'>

                    {/* <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Formateur</th>
                                <th>Module</th>
                                <th>Groupe</th>
                                <th>Nombre de copie</th>
                            </tr>
                            </thead>
                            <tbody>
                            {notification.map(e=><tr>
                            <td>{e.Formateur}</td>
                            <td>{e.Module}</td>
                            <td>{e.Groupe}</td>
                            <td>{e.Nombre_de_copie}</td>
                        </tr>)}
                            </tbody>
                        </table> */}
                        
                    <table className='table table-striped'>
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
                                    notification.map(e=><tr>
                                        <td>{e.Formateur}</td>
                                        <td>{e.Module}</td>
                                        <td>{e.Groupe}</td>    
                                        <td>{e.filiere}</td>
                                        <td>{e.copie}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
                <CopiesChart />
        </div>
    </div>
}