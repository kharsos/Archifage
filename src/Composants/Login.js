import { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [addClass, setAddClass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [Users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/user", {
        name: name,
        email: email,
        password: password,
        _id: Users.length + 1,
        type: "formateur",
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [Users]);

  const connexion = () => {
    let test = false;
    Users.map((e) => {
      if (e.email === email && e.password === password) {
        if (e.type === "admin") {
          navigate("/GestionFormateur");
        } else if (e.type === "formateur") {
          navigate(`/Formateur/${e._id}`)
        } else {
          navigate("/notification");
        }
        test = true;
      }
    });
    if (test === false) {
      setErr(true);
    }
  };
  return (
    <div className="body">   
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={connexion}>
		  <img src='ofppt.png' alt="logo"></img>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span style={{ fontStyle: "italic", color: "red" }}>
              {!err ? "" : "email or password are incorrect"}
            </span>
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
    </div>
  );
}
