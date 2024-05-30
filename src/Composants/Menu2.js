import { Link } from "react-router-dom";
import './Menu.css'

export default function Menu2(){
    return <nav id="sidenav" className="col-md-3 col-lg-2 d-md-block blue sidebar collapse">
    <div className="position-sticky d-flex flex-column" style={{ height: '100vh' }}>
        <div className="text-center my-3">
            <img src='http://localhost:3000/ofppt.png' alt="logo" className="img-fluid"></img>
            <h2 style={{ color: 'white' }}>NTIC SYBA</h2>
        </div>
        <hr />
        <div className="flex-grow-1"></div>
        <Link to={'/'}>
            <button type="button" className="btns mb-5">
                <img src="http://localhost:3000/log-out.png" alt="logout" className="img-fluid" style={{width:'30px'}}></img>
                Logout
            </button>
        </Link>
    </div>
</nav>
}