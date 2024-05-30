import { Link } from "react-router-dom";
import './Menu.css'

export default function Menu(){
    return <nav id="sidenav" className="col-md-3 col-lg-2 d-md-block blue sidebar collapse">
    <div className="position-sticky d-flex flex-column" style={{ height: '100vh' }}>
        <div className="text-center my-3">
            <img src='http://localhost:3000/ofppt.png' alt="logo" className="img-fluid"></img>
            <h2 style={{ color: 'white' }}>NTIC SYBA</h2>
        </div>
        <hr />
        <div className="flex-grow-1">
            <Link to={'/GestionFormateur'}>
                <button type='button' className="btns btn d-flex align-items-center">
                    <img src="http://localhost:3000/home.png" alt="home" className="me-2"></img>
                    <span>Formateur</span>
                </button>
            </Link>
            <Link to={'/Admin/Groupes'}>
                <button type='button' className="btns btn d-flex align-items-center">
                    <img src="http://localhost:3000/graduate.png" alt="home" className="img-fluid" style={{width:'30px'}}></img>
                    <span>Groupes</span>
                </button>
            </Link>
            <Link to={'/GestionFiliere'}>
                <button type='button' className="btns btn d-flex align-items-center">
                    <img src="http://localhost:3000/book.png" alt="book" className="img-fluid" style={{width:'30px'}}></img>
                    <span>Filieres</span>
                </button>
            </Link>
            <Link to={'/statistique'}>
                <button type='button' className="btns btn d-flex align-items-center">
                    <img src="http://localhost:3000/book.png" alt="book" className="img-fluid" style={{width:'30px'}}></img>
                    <span>Statistique</span>
                </button>
            </Link>
        </div>
        <Link to={'/'}>
            <button type="button" className="btns">
                <img src="http://localhost:3000/log-out.png" alt="logout" className="img-fluid" style={{width:'30px'}}></img>
                Logout
            </button>
        </Link>
    </div>
</nav>
}