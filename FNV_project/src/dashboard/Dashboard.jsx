import './Dashboard.css'
import Navbar from '../common/Navbar'

export default function Dashboard() {
    return (
        <>
        <Navbar/>
        <div className='tablero'>
            <div className='item1'>
                <h1>¡Bienvenido a tu dashboard personal!</h1>
                <ul>
                    <li>Ingresa tus ramos <a href='/ramos'>aquí</a></li>
                    <li>Estudia con la técnica pomodoro <a href='/pomodoro'>aquí</a></li>
                </ul>
                <div>
                    <h3>Música para tu estudio... &#127926;</h3>
                    <ul>
                        <li><a href='https://youtu.be/lTRiuFIWV54?si=wkOZXTjaKO4wI36F'>Lofi</a>&#128218;</li>
                        <li><a href='https://youtu.be/cyCOl_GPhdc?si=_sulmfS4P5HUTndx'>Motivadora</a>&#9889; </li>
                        <li><a href='https://youtu.be/_BtXPQimVhg?si=p4s68gn8jreVePhW'>Desestresante</a>&#127808;</li>
                    </ul>
                </div>
            </div>
            <div className='item2'>
                <div className='item-container'>
                    <p><a href='/calendario'>Calendario</a></p>
                    <img src="src/assets/calendario.png" alt="calendario" />
                </div>
            </div>
            <div className='item3'>
                <div className='item-container'>
                    <p><a href='/horario'>Horario</a></p>
                    <img src="src/assets/horario.png" alt="horario" />
                </div>
            </div>
        </div>
        </>
    )
}