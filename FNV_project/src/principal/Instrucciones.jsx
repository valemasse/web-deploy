import Navbar from '../common/Navbar';
import './Instrucciones.css';
import React, { Component } from "react";

class Instrucciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonTexts: {
        Calendario: "Para llegar a la pestaña de calendario deberás hacerlo a través de la barra de navegación o tu dashboard, ya en esta podras ver el calendario del mes en el que te encuentras, con sus respectivos eventos, tareas y evaluaciones.",
        Horario: "Para acceder al horario deberás hacerlo a través de la barra de navegación o tu dashboard, una vez dentro podrás ver tu horario de esta semana y también tendrás la opción de agregar nuevas clases o sesiones de estudio mediante un botón, al hacerle click se te enviará a una pagina donde podrás crear cada una actividad con una variedad de opciones, para luego ser agregada al horario.",
        Ramos: "Para acceder a tus ramos deberás hacerlo por la barra de navegación, en esta página podrás ver todos tus ramos, al hacer click en uno de ellos podrás ver todas las evaluaciones, tareas y actividades relacionadas con el ramo. Al igual que en el calendario y horario tendrás la opcion de agregar cada uno de estos elementos. Por último, a medida que vayas completando tus evaluaciones podras ir marcándolas como completadas, pendientes o en proceso.",
        Herramientas: "StudyOrg te brinda un temporizador para estudiar con el método pomodoro, para el cual deberás ingresar un tiempo de estudio y de descanso, tras iniciarlo te avisará cuándo es hora de descansar y cuando es tiempo de seguir estudiando. Puedes acceder a este desde tu dashboard donde además cuentas con playlists recomendadas para tu estudio.",
      },
      currentButtonText: "Selecciona una sección",
    };
  }

  handleButtonClick = (newText) => {
    this.setState({ currentButtonText: newText });
  };

  render() {
    return (
      <div className="ins-container">
        <Navbar/>
        <div className="ins-button-row">
          <button className='ins-button' onClick={() => this.handleButtonClick(this.state.buttonTexts.Calendario)}>
            Calendario
          </button>
          <button className='ins-button' onClick={() => this.handleButtonClick(this.state.buttonTexts.Horario)}>
            Horario
          </button>
          <button className='ins-button' onClick={() => this.handleButtonClick(this.state.buttonTexts.Ramos)}>
            Ramos
          </button>
          <button className='ins-button' onClick={() => this.handleButtonClick(this.state.buttonTexts.Herramientas)}>
            Herramientas
          </button>
        </div>
        <div className="ins-text-container">
          <p className='ins-text'>{this.state.currentButtonText}</p>
        </div>
      </div>
    );
  }
}

export default Instrucciones;


