import { useEffect, useState } from "react";

const mapa = [
["🟩","⬜","⬜","⬜","⬜","⬜","⬜","⬜","🟩"],
["🟩","⚽","⬜","⬜","🟩","🟩","🟩","🟩","🟩"],
["⬜","🟩","🟩","⬜","🟩","⬜","⬜","🟩","⬜"],
["⬜","🟩","⬜","⬜","🟩","⬜","⬜","🟩","⬜"],
["⬜","🟩","🟩","🟩","🟩","🟩","⬜","🟩","⬜"],
["⬜","⬜","⬜","🟩","⬜","⬜","🟩","🟩","🟩"],
["⬜","🟩","🟩","🟩","⬜","⬜","⬜","🟩","⬜"],
["⬜","🟩","⬜","⬜","🟩","🟩","🟩","🥅","⬜"],
["⬜","🟩","🟩","🟩","🟩","⬜","⬜","⬜","⬜"],
];

export default function MazeGame({ onWin }) {

  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [win, setWin] = useState(false);

  const mover = (dx, dy) => {
    console.log("Antes:", player.x, player.y);
    console.log("Movimiento:", dx, dy);

    if (win) return;
    setPlayer((anterior) => {
      const nuevoX = player.x + dx;
      const nuevoY = player.y + dy;
      console.log("Después:", nuevoX, nuevoY);

      if (
        nuevoY < 0 ||
        nuevoY >= mapa.length ||
        nuevoX < 0 ||
        nuevoX >= mapa[0].length
      ) {
        return anterior;
      }

    const casilla = mapa[nuevoY][nuevoX];

    if (casilla === "⬜") return anterior;

    if (casilla === "🥅") {
      setWin(true);
    }

    return {
      x: nuevoX,
      y: nuevoY,
    };
  });

};


  useEffect(() => {

    const tecla = (e) => {

      e.preventDefault();

      switch (e.key) {

        case "ArrowUp":
          mover(0, -1);
          break;

        case "ArrowDown":
          mover(0, 1);
          break;

        case "ArrowLeft":
          mover(-1, 0);
          break;

        case "ArrowRight":
          mover(1, 0);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", tecla);

    return () => window.removeEventListener("keydown", tecla);

  }, []);

  return (
    <div>

      <p>
        Lleva el balón hasta la portería siguiendo el césped⚽🥅
      </p>

      <div className="maze">

        {mapa.map((fila, y) =>
          fila.map((celda, x) => {

            let contenido = celda;

            if (player.x === x && player.y === y) {
              contenido = "⚽";
            } else if (celda === "⚽") {
              contenido = "🟩";
            }

            return (
              <div
                key={`${x}-${y}`}
                className={`cell ${celda === "⬛" ? "wall" : "path"}`}
              >
                {contenido}
              </div>
            );
          })
        )}

      </div>

      {!win && (
        <div className="controles">

          <button
            className="intro-button controlButton"
            onClick={() => mover(0, -1)}
          >
    ↑
          </button>

          <div className="filaControles">

            <button
              className="intro-button controlButton"
              onClick={() => mover(-1, 0)}
            >
      ←
            </button>

            <button
              className="intro-button controlButton"
              onClick={() => mover(0, 1)}
            >
      ↓
            </button>

            <button
              className="intro-button controlButton"
              onClick={() => mover(1, 0)}
            >
      →
            </button>

          </div>

        </div>
      )}

      {win && (
        <div className="win">

          <h2>⚽ ¡GOOOOOL! ⚽</h2>

          <p>
            Has marcado el gol de la victoria
          </p>

          <p>
            Ahora toca el útlimo reto 🤍
          </p>

          <button
            className="intro-button"
            onClick={() =>{
              if(onWin){
                onWin();
              }
            }}
            >
            Siguiente prueba
          </button>

        </div>
      )}

    </div>
  );
}