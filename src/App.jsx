import { useState } from "react";
import "./App.css";
import fotoPuzzle from "./assets/foto-puzzle.jpg";
import DinoGame from "./DinoGame";
import MazeGame from "./MazeGame";
import HeartRainGame from "./HeartRainGame";
import FinalGame from "./FinalGame";
import entradas from "./assets/entrada2.png";

const preguntas = [
  {
    pregunta: "¿Cómo se llama el primer álbum que saco Roa?",
    correcta: "Private Suite, Vol.1",
    opciones: ["Private Suite, Vol.2", "Private Suite, Vol.1", "PRIVATE SUITE (Complete EP Edition)", "Private Suite, Vol.1.1"],
  },
  {
    pregunta: "¿Qué canción no está en Real Hasta la Muerte de Anuel AA?",
    correcta: "Me Siento HP",
    opciones: ["Hipócrita", "Me Siento HP", "Quiere Beber", "Yeezy"],
  },
  {
    pregunta: "¿Contra qué equipo marcó Vinícius Júnior su primer gol en La Liga con el Real Madrid?",
    correcta: "Real Valladolid",
    opciones: ["Real Valladolid", "Real Betis", "FC Barcelona", "Granada CF"],
  },
  {
    pregunta: "¿En qué año fichó oficialmente Vinícius Júnior por el Real Madrid?",
    correcta: "2018",
    opciones: ["2016", "2017", "2018", "2019"],
  },  
  {
    pregunta: "¿Cuál es la capital de Austria?",
    correcta: "Viena",
    opciones: ["Canberra", "Riga", "Vilna", "Viena"],
  },
  {
    pregunta: "¿A que país pertenece Ottawa?",
    correcta: "Canadá",
    opciones: ["Canadá", "EEUU", "Groelandia", "Gatineau"],
  },
  {
    pregunta: "¿Dónde fue nuestro primer beso?",
    correcta: "Banco",
    opciones: ["Banco", "Coche", "Parque", "Cine"],
  },
  {
    pregunta: "Nuestro primer viaje juntos fue a...",
    correcta: "Córdoba",
    opciones: ["Sevilla", "Córdoba", "Granada", "Valencia"],
  },
  {
    pregunta: "¿Cómo llamaste al primer peluche que ganamos en la feria?",
    correcta: "Stich",
    opciones: ["Stich", "Osito", "Cerdo", "Blue"],
  },
  {
    pregunta: "Tu jugador favorito de pádel es Tapia, el mío es...",
    correcta: "Miguel AH",
    opciones: ["Lebrón", "Galán", "Miguel AH", "Chingotto"],
  },
];

const COLUMNAS = 4;
const FILAS = 5;

const puzzleInicial = [
  7, 3, 12, 1,
  16, 5, 20, 8,
  2, 14, 10, 18,
  4, 19, 6, 13,
  9, 15, 11, 17,
];

const solucion = Array.from({ length: 20 }, (_, i) => i + 1);

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [mensaje, setMensaje] = useState("");

  const [puzzle, setPuzzle] = useState(puzzleInicial);
  const [seleccionada, setSeleccionada] = useState(null);
  const [puzzleCompletado, setPuzzleCompletado] = useState(false);
  const [dinoCompletado, setDinoCompletado] = useState(false);
  const [mazeCompletado, setMazeCompletado] = useState(false);
  const [heartCompletado, setHeartCompletado] = useState(false);
  const [regaloAbierto, setRegaloAbierto] = useState(false);

  const responder = (respuesta) => {
    if (respuesta === preguntas[preguntaActual].correcta) {
      setMensaje("¡CORRECTO MI AMOR! 👏🏼");

      setTimeout(() => {
        setMensaje("");

        if (preguntaActual < preguntas.length - 1) {
          const siguiente = preguntaActual + 1;
          setPreguntaActual(siguiente);
          setProgreso(siguiente * 2);
        } else {
          setProgreso(20);
          setPantalla("puzzle");
        }
      }, 900);
    } else {
      setMensaje("🤨 Inténtalo otra vez");
    }
  };

  const moverPieza = (indice) => {
    if (puzzleCompletado) return;

    if (seleccionada === null) {
      setSeleccionada(indice);
      return;
    }

    if (seleccionada === indice) {
      setSeleccionada(null);
      return;
    }

    const nuevoPuzzle = [...puzzle];

    [
      nuevoPuzzle[seleccionada],
      nuevoPuzzle[indice],
    ] = [
      nuevoPuzzle[indice],
      nuevoPuzzle[seleccionada],
    ];

    setPuzzle(nuevoPuzzle);
    setSeleccionada(null);

    const completo = nuevoPuzzle.every(
      (pieza, i) => pieza === solucion[i]
    );

    if (completo) {
      setPuzzleCompletado(true);
      setProgreso(40);
    }
  };

  if (pantalla === "inicio") {
    return (
      <div className="container">

        <div className="intro">

          <p className="intro-tag">
            UN REGALO  PARA TI
            05/07/2026
          </p>

          <h1 className="intro-title">
            He preparado algo especial
          </h1>

          <div className="intro-line"></div>

          <p className="intro-text">
            Hoy no vas a abrir un regalo
          </p>

          <p className="intro-text">
            Vas a conseguirlo
          </p>

          <p className="intro-description">
            Cada prueba te acercará un poco más al final.
            Solo cuando superes todas descubrirás qué te espera
          </p>

          <button
            className="intro-button"
            onClick={() => setPantalla("quiz")}
          >
            Comenzar
          </button>

        </div>

      </div>
    );
  }

  if (pantalla === "quiz") {
    return (
      <div className="container">

        <div className="quiz-header">

          <h1 className="intro-title">
            Primera Prueba: Quiz
          </h1>

          <div className="intro-line"></div>

          <p className="quiz-description">
            El reto comienza aquí... Cada respuesta correcta te acercará un poco más al final
          </p>

        </div>

          <p className="quiz-progress">
            {progreso}%
          </p>
        

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progreso}%` }}
          />
        </div>

        <div className="quiz-card">
          <h2 className="quiz-question">
            {preguntas[preguntaActual].pregunta}
          </h2>
        </div>

        {preguntas[preguntaActual].opciones.map((opcion) => (
          <button
            key={opcion}
            className="quiz-option"
            onClick={() => responder(opcion)}
          >
            {opcion}
          </button>
        ))}

        {mensaje && (
          <p className="quiz-message">
            {mensaje}
          </p>
        )}

      </div>
    );
  }

    if (pantalla === "puzzle") {
    return (
      <div className="container">
        <h1>Segunda Prueba: Puzzle</h1>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progreso}%` }}
          />
        </div>

        <p>{progreso}% completado</p>

        <p>
          Pulsa una pieza y después otra para intercambiarlas.
        </p>

        <div
          className="puzzleGrid"
          style={{
            gridTemplateColumns: `repeat(${COLUMNAS}, 1fr)`,
          }}
        >
          {puzzle.map((pieza, indice) => {
            const numero = pieza - 1;

            const columna = numero % COLUMNAS;
            const fila = Math.floor(numero / COLUMNAS);

            return (
              <button
                key={indice}
                onClick={() => moverPieza(indice)}
                className={
                  seleccionada === indice
                    ? "piezaFoto seleccionadaFoto"
                    : "piezaFoto"
                }
                style={{
                  backgroundImage: `url(${fotoPuzzle})`,
                  backgroundSize: `${COLUMNAS * 100}% ${FILAS * 100}%`,
                  backgroundPosition: `${
                    (columna / (COLUMNAS - 1)) * 100
                  }% ${
                    (fila / (FILAS - 1)) * 100
                  }%`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            );
          })}
        </div>

        {puzzleCompletado && (
          <div className="puzzleFinal">

            <p>
              🤎 Has reconstruido uno de nuestros recuerdos favoritos 🤎
            </p>

            <img
              src={fotoPuzzle}
              alt="Foto completa"
              className="fotoCompleta"
            />

            <button
              className="intro-button"
              onClick={() => {
                setPantalla("dino");
              }}
            >
              Siguiente Minijuego
            </button>
          </div>
        )}
      </div>
    );
  }
  
  if (pantalla === "dino") {
    return (
      <div className="container">
        <h1>Tercera Prueba: Carrera </h1>
        
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${dinoCompletado ? 60 : 40}%`,
            }}
          ></div>
        </div>
        <p className="gameProgress">
          {dinoCompletado
            ? "60% completado"
            : "40% completado"}
        </p>
        <DinoGame
          onWin={() => {
            setDinoCompletado(true);
            setPantalla("maze");
          }}
        />
      </div>
    );
  }

  if (pantalla === "maze") {
    return (
      <div className="container">
        <h1>Cuarta Prueba: GOOL</h1>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${mazeCompletado ? 80 : 60}%`,
            }}
          />
        </div>

        <p>
          {mazeCompletado
            ? "80% completado"
            : "60% completado"}
        </p>

        <MazeGame
          onWin={() => {
            setMazeCompletado(true);
            setPantalla("heart");
          }}
        />
      </div>
    );
  }

  if (pantalla === "heart") {
    return (
      <div className="container">

        <h1>Quinta Prueba: Nuestros momentos</h1>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${heartCompletado ? 100 : 80}%`,
            }}
          />
        </div>

        <p>
          {heartCompletado
            ? "100% completado"
            : "80% completado"}
        </p>

        <HeartRainGame
          onComplete={() => {
            setHeartCompletado(true);
          }}

          onWin={()=>{
            setPantalla("final");
          }}
        />

      </div>
    );
  }

  if (pantalla === "final") {

  return (

    <div className="container">

      <h1></h1>

      <div className="progress-container">

        <div
          className="progress-bar"
          style={{
            width: "100%"
          }}
        />

      </div>

      <p>100% completado ❤️</p>

      <FinalGame />

    </div>

  );

}

return null;
}

export default App;