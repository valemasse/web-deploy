import './Horario.css'
import Navbar from '../common/Navbar'

export default function Horario() {
    return (
        <>
        <Navbar/>
        <h1>Tu horario</h1>
        <div className='horario'>
            <div className='horario-item'></div>
            <div className='horario-item'>Lunes</div>
            <div className='horario-item'>Martes</div>
            <div className='horario-item'>Miércoles</div>
            <div className='horario-item'>Jueves</div>
            <div className='horario-item'>Viernes</div>
            <div className='horario-item'>Sábado</div>
            <div className='horario-item'>Domingo</div>
            <div className='horario-item'>8:20</div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'>9:40</div>
            <div className='horario-item' id="catedra">Bases de datos</div>
            <div className='horario-item'></div>
            <div className='horario-item' id="catedra">Bases de datos</div>
            <div className='horario-item'></div>
            <div className='horario-item' id="ayudantia">Bases de datos</div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'>11:00</div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item' id='personal'>Estudiar</div>
            <div className='horario-item'></div>
            <div className='horario-item'>12:20</div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
            <div className='horario-item'></div>
        </div>
        <button>Agregar actividad</button>
        <div className='leyenda'>
            <h3>Leyenda</h3>
            <p>Naranjo: Cátedra</p>
            <p>Verde: Ayudantía</p>
            <p>Celeste: Evento personal</p>
        </div>
        </>
    )
}