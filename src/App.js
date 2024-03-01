import Signup from "./Composants/Signup";

import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from "./Composants/Login";
export default function App(){
   
    
    return(
       
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signup/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
            </Routes>  
        </BrowserRouter>
       
    );
} 