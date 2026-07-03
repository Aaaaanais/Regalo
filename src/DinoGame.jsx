import { useEffect, useRef, useState } from "react";

export default function DinoGame({ onWin}) {
  const [jumping, setJumping] = useState(false);
  const [cactusX, setCactusX] = useState(900);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [cactusCount, setCactusCount] = useState(0);

  const jumpRef = useRef(false);

  const PLAYER_X = 80;

  const saltar = () => {
    if (jumpRef.current || gameOver || win) return;

    setJumping(true);
    jumpRef.current = true;

    setTimeout(() => {
      setJumping(false);
      jumpRef.current = false;
    }, 550);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        saltar();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener("keydown", handleKey);
  }, [gameOver, win]);

  useEffect(() => {
    if (gameOver || win) return;

    const interval = setInterval(() => {
      setCactusX((x) => {
        const siguiente = x - 8;

        if (siguiente < -80) {
          return(() => {
            setCactusCount((c) => Math.min(c+1, 10
            ));
            return 900;
          })();
        }

        return siguiente;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [gameOver, win]);

  useEffect(() => {
    if (gameOver || win) return;

    const collision = setInterval(() => {
      const cactusEnZona =
        cactusX > PLAYER_X + 5 &&
        cactusX < PLAYER_X + 35;

      if (cactusEnZona && !jumping) {
        setGameOver(true);
      }
    }, 20);

    return () => clearInterval(collision);
  }, [cactusX, jumping, gameOver, win]);

  useEffect(() => {
    if (cactusCount >= 10 && !gameOver && !win) {
      setWin(true);
    }
  }, [cactusCount, gameOver, win]);

  const reset = () => {
    setJumping(false);
    setGameOver(false);
    setWin(false);
    setCactusCount(0);
    setCactusX(900);
    jumpRef.current = false;
  };

  return (
    <div className="game">
      
      <p>💔 Obstáculos superados: {cactusCount}/10</p>

      <p>Toca la pantalla para saltar</p>

      <div
        className="escenario"
        onClick={saltar}
        onTouchStart={(e) => {
          e.preventDefault();
          saltar();
        }}
      >
        <div className={`jugador ${jumping ? "salto" : ""}`}>
          🧍
        </div>

        {!win && (
          <div
            className="cactus"
            style={{ left: cactusX }}
          >
            🌵
          </div>
        )}

        {gameOver && (
          <div className="gameover">
            <h2>💀 Has chocado</h2>

            <p>
              Vuelve a empezar desde el principio
            </p>

            <button onClick={reset}>
              Reintentar
            </button>
          </div>
        )}

        {win && (
          <div className="win">
            <h2>
              ❤️ Después de todos los obstáculos siempre acabas encontrándome ❤️
            </h2>

            
            <button
                onClick={() => {
                    if (onWin) {
                        onWin()
                    }
                  }}
            >
                Siguiente minijuego ❤️
            </button>

          </div>
        )}
      </div>
    </div>
  );
}