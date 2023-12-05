import Navbar from "../common/Navbar";
import './Pomodoro.css';

export default function Pomodoro() {

  return (
    <>
      <Navbar/>
      <div className="container-pomodoro">
        <div className="info-pomodoro">
            <h1>Técnica Pomodoro</h1>
            <div className="form-registro">
                <h2>Tiempo de estudio</h2>
                <input/>
                <h2>Tiempo de descanso</h2>
                <input/>
                <h2>Número de bloques de estudio</h2>
                <input/>
                <br/> <br/>
                <button>Empezar</button>
            </div>
        </div>
        <div className="contador-pomodoro">
            <img src="src/assets/pomodoro.png" alt="pomodoro" />
        </div>
        
      </div>
      
    </>
  )
}
