import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from '../principal/App'
import SignIn from '../profile/SignIn'
import Dashboard from "../dashboard/Dashboard"
import Ramos from "../ramos/Ramos"
import Ramo from "../ramos/Ramo"
import Evaluaciones from "../evaluaciones/Evaluaciones"
import Calendario from "../calendario/Calendario"
import Horario from "../horario/Horario"
import Instrucciones from '../principal/Instrucciones'
import Pomodoro from "../pomodoro/Pomodoro"
import Perfil from "../profile/Perfil"
import Login from "../profile/Login"
import Actividades from "../actividades/Actividades"
import Ediciones from "../ediciones/Ediciones"
import Admin from "../profile/Admin"

function Routing(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />}/>
        <Route path={"/dashboard"} element={<Dashboard />}/>
        <Route path={"/ramos"} element={<Ramos />}/>
        <Route path={"/ramos/:id"} element={<Ramo />}/>
        <Route path={"/ramos/:id_ramos/evaluaciones"} element={<Evaluaciones />}/>
        <Route path={"/calendario"} element={<Calendario />}/>     
        <Route path={"/horario"} element={<Horario />}/>
        <Route path={"/registro"} element={<SignIn />}/>
        <Route path={"/perfil"} element={<Perfil />}/>
        <Route path={"/actividades"} element={<Actividades />}/>
        <Route path={"/pomodoro"} element={<Pomodoro />}/>
        <Route path={"/instrucciones"} element={<Instrucciones />}/>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/edicion/:item/:necessaryId/:editId"} element={<Ediciones />}/>
        <Route path={"/admin"} element={<Admin />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Routing;
