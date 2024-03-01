import { Link } from "react-router-dom";
import './Menu.css'
export default function Menu(){
    return (
        <nav className="nav">
            <img src='ofppt.png' alt="logo"></img>
            <h2 style={{color:'white'}}>NTIC SYBA</h2>
            <hr></hr>
                <button type='button' className="btns"><img src="home.png" alt="home"></img><span>Teachers</span></button>
                <button type='button' className="btns" style={{backgroundColor:'transparent',border:'none'}}><img src="graduate.png" alt="home"></img><span>Teachers</span></button>
        </nav>
    )
}