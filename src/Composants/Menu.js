import { Link } from "react-router-dom";

export default function Menu(){
    return <nav className="nav">
                <img src='http://localhost:3000/ofppt.png' alt="logo"></img>
                <h2 style={{color:'white'}}>NTIC SYBA</h2>
                <hr></hr>
                <div>
                    <Link to={'/GestionFormateur'}><button type='button' style={{backgroundColor:'transparent',border:'none'}} className="btns"><img src="http://localhost:3000/home.png" alt="home"></img><span>Formateur</span></button></Link>
                    <Link to={'/Admin/Groupes'}><button type='button' className="btns" style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3000/graduate.png"  alt="home"></img><span>Groupes</span></button></Link>
                    <Link to={'/GestionFiliere'}><button type='button' className='btns' style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3000/book.png" alt="book"></img><span>Filieres</span></button></Link>
                    <Link to={'/statistique'}><button type='button' className='btns' style={{backgroundColor:'transparent',border:'none'}}><img src="http://localhost:3000/book.png" alt="book"></img><span>Statistique</span></button></Link>
                </div>
            </nav>
}