import { useState } from "react";
import entradas from "./assets/entrada2.png";

export default function FinalGame() {

  const [abierto, setAbierto] = useState(false);

  return (

    <div className="finalContainer">

      <h1 className="intro-title">
        Lo has conseguido!!!
      </h1>

      <div className="intro-line"></div>

      <p className="finalText">
        Has superado todas las pruebas...
      </p>

      <p className="finalText">
        Cada respuesta,
      </p>

      <p className="finalText">
        cada recuerdo
      </p>

      <p className="finalText">
        y cada reto
      </p>

      <p className="finalText">
        te han traído hasta aquí
      </p>

      <div className={`flipCard ${abierto ? "flip" : ""}`}>

        <div className="flipCardInner">

          {/* Cara delantera */}

          <div className="flipFront">

            <h2 className="flipTitle">
              Ahora solo queda descubrir tu regalo
            </h2>

            <button
              className="intro-button"
              onClick={() => setAbierto(true)}
            >
              ABRIR
            </button>

          </div>

          {/* Cara trasera */}

          <div className="flipBack">

            <h2 className="flipTitle">
              ❤️ Sorpresa ❤️
            </h2>

            <img
              src={entradas}
              className="fotoEntradas"
            />

            <p className="finalMessage">
              Espero que disfrutes muchísimo este día
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}