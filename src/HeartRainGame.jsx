import { useEffect, useState } from "react";

export default function HeartRainGame({ onComplete, onWin }) {

  const [puntos, setPuntos] = useState(0);
  const [corazones, setCorazones] = useState([]);
  const [win, setWin] = useState(false);

  // Crear corazones
  useEffect(() => {

    if (win) return;

    const intervalo = setInterval(() => {

      const nuevo = {
        id: Date.now() + Math.random(),
        x: Math.random() * 90,
        y: -10,
        velocidad: 0.5 + Math.random() * 0.5,
        bueno: Math.random() < 1.5
      };

      setCorazones((anteriores) => [...anteriores, nuevo]);

    }, 1000);

    return () => clearInterval(intervalo);

  }, [win]);

  // Mover corazones
  useEffect(() => {

    if (win) return;

    const intervalo = setInterval(() => {

      setCorazones((anteriores) =>
        anteriores
          .map((c) => ({
            ...c,
            y: c.y + c.velocidad
          }))
          .filter((c) => c.y < 110)
      );

    }, 30);

    return () => clearInterval(intervalo);

  }, [win]);

  const pulsarCorazon = (id, bueno) => {

    if (win) return;

    setCorazones((anteriores) =>
      anteriores.filter((c) => c.id !== id)
    );

    if (bueno) {
      setPuntos((p) => p + 1);
    } else {
      setPuntos((p) => Math.max(0, p - 1));
    }

  };

  // Victoria
  useEffect(() => {

    if (puntos >= 10 && !win) {

      setWin(true);

      // Hace subir la barra al 100%
      if (onComplete) {
        onComplete();
      }

    }

  }, [puntos, win, onComplete]);

  return (
    <div>


      <h3>Puntos: {puntos}/10</h3>

      <div className="heartArea">

        {corazones.map((corazon) => (

          <div
            key={corazon.id}
            className="heart"
            style={{
              left: `${corazon.x}%`,
              top: `${corazon.y}%`
            }}
            onClick={() =>
              pulsarCorazon(corazon.id, corazon.bueno)
            }
            onTouchStart={() =>
              pulsarCorazon(corazon.id, corazon.bueno)
            }
          >
            {corazon.bueno ? "❤️" : "💔"}
          </div>

        ))}

      </div>

      {win && (

        <div className="win">

          <h2>❤️ ¡Has reunido todo mi amor! ❤️</h2>

          <p>Ya has superado todas las pruebas.</p>

          <button
            onClick={() => {
              if (onWin) {
                onWin();
              }
            }}
          >
            Abrir regalo 🎁
          </button>

        </div>

      )}

    </div>
  );
}