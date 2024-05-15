import Login from './Composants/Login';

import './App.css'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Groupes from "./Composants/Groupes";
import GestionFormateur from "./Composants/GestionFormateur";
import Modules from "./Composants/Modules";
import ModifierFormateur from "./Composants/ModifierFormateur";
import Notification from "./Composants/Notifications";
import ShowNotification from "./Composants/ShowNotifications";
import AffecterFormateur from "./Composants/AffecterFormateur";
import GestionFiliere from "./Composants/GestionFiliere";
import AjouterModule from "./Composants/AjouterModule";
import Formateur from './Composants/Formateur';
export default function App(){
   
    
    return(
       
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/GestionFormateur' element={<GestionFormateur/>}></Route>
                <Route path="/Admin/Groupes" element={<Groupes />}></Route>
                <Route path="/Admin/Groupe/:id/Modules" element={<Modules />}></Route>
                <Route path="/Admin/modifier_formateur/:id" element={<ModifierFormateur />}></Route>
                <Route path="/notification" element={<Notification />}></Route>
                <Route path="/ShowNotifications" element={<ShowNotification />}></Route>
                <Route path="/AffecterFormateur/:id" element={<AffecterFormateur />}></Route>
                <Route path="/GestionFiliere" element={<GestionFiliere />}></Route>
                <Route path="/GestionFiliere/:id" element={<AjouterModule />}></Route>
                <Route path='/Formateur/:id' element={<Formateur />}></Route>
            </Routes>  
        </BrowserRouter>
       
    );
} 