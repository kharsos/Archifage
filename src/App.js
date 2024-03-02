import Signup from "./Composants/Signup";

import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Groupes from "./Composants/Groupes";
import Login from "./Composants/Login";
import Modules from "./Composants/Modules";
export default function App(){
   
    
    return(
       
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signup/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path="/Admin/Groupes" element={<Groupes />}></Route>
                <Route path="/Admin/Groupe/:id/Modules" element={<Modules />}></Route>
            </Routes>  
        </BrowserRouter>
       
    );
} 