
import { useEffect, useState } from "react";
import './login.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Signup(){
    const [addClass,setAddClass]=useState('')
	const[name,setName]=useState('')
	const[email,setEmail]=useState('')
	const [password,setPassword]=useState('')
	const navigate=useNavigate()
	const [Users,setUsers]=useState([])
	const [err,setErr]=useState(false)
	const handleSubmit=(e)=>{
		e.preventDefault()
		axios.post('http://localhost:8080/user',{name:name,email:email,password:password,_id:Users.length+1,type:'formateur'})
		.then(result =>  {console.log(result)
            navigate('/login')
        })
		.catch(err =>console.log(err))
	}
	useEffect(()=>{
		axios.get('http://127.0.0.1:8080/users')
		.then(res=>setUsers(res.data))
		.catch(err=>console.log(err))
	},[Users])

	const connexion = () =>{
		let test= false;
		Users.map((e)=>{
			if(e.email===email&&e.password===password){
				if(e.type==='admin'){navigate('/login')}
				else{alert('formateur !!')}
				test=true
			}
		})
		if(test===false){
			setErr(true)
		}
	}
    return(
       <div className="body">
<div className={`container ${addClass}`} id="container">
	<div className="form-container sign-up-container">
		<form action="#" onSubmit={handleSubmit}>
			<h1>Create Account</h1>
			<span>or use your email for registration</span>
			<input type="text" placeholder="Name" autoComplete="off" onChange={(e)=>setName(e.target.value)} />
			<input type="email" placeholder="Email"autoComplete="off" onChange={(e)=>setEmail(e.target.value)} />
			<input type="password" placeholder="Password"autoComplete="off" onChange={(e)=>setPassword(e.target.value)} />
			<button >Sign Up</button>
		</form>
		<Link to="/login"  className="btn btn-default borde w-10 bg-li"></Link>
		
	</div>
	<div className="form-container sign-in-container">
		<form action="#" onSubmit={connexion}>
			<h1>Sign in</h1>
			<span>or use your account</span>
			<input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
			<input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
			<span style={{fontStyle:'italic',color:'red'}}>{!err?'':'email or password are incorrect'}</span>
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
		</form>
		
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className="ghost" id="signIn" onClick={()=>setAddClass('')}>Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button className="ghost" id="signUp"  onClick={()=>setAddClass('right-panel-active')}>Sign Up</button>
			</div>
		</div>
	</div>
</div>


       </div>
          );
}