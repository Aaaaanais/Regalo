import { useState } from "react";
import entradas from "./assets/entrada2.png";

export default function FinalGame() {

  const [abierto, setAbierto] = useState(false);

  return (

    <div className="finalGame">

      <h1>❤️ Lo has conseguido ❤️</h1>

      {!abierto ? (

        <>

          <h2>🎁</h2>

          <p>
            Has superado todas las pruebas.
          </p>

          <p>
            Solo queda abrir tu regalo...
          </p>

          <button
            onClick={() => setAbierto(true)}
          >
            Abrir regalo 🎁
          </button>

        </>

      ) : (

        <div className="regalo">

          <h1>🎉 ¡SORPRESA! 🎉</h1>

          <p>Prepárate para nuestra próxima aventura... ❤️</p>

          <img
            src={entradas}
            alt="Entradas"
            className="fotoEntradas"
          />

        </div>

      )}

    </div>

  );

}