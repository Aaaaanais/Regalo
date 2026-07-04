import { useEffect, useState } from "react";

export default function HeartRainGame({ onComplete, onWin }) {

  const [puntos, setPuntos] = useState(0);
  const [corazones, setCorazones] = useState([]);
  const [win, setWin] = useState(false);

  // Crear corazones
  useEffect(() => {

    if (win) return;

    const intervalo = setInterval(() => {

      const buenos = ["🎾","🎱","🏓","🏸","🏋🏼","🚴🏼"];
      const malos = ["🏀","🏈","🏒","🏇🏼","🛼","🎡","🏀","🏈","🏒","🏇🏼","🛼","🎡"];

      const esBueno = Math.random() < 0.4;

      const nuevo = {
        id: Date.now() + Math.random(),
        x: Math.random() * 90,
        y: -10,
        velocidad: esBueno
          ? 1 + Math.random()*0.8
          : 0.6 + Math.random()*0.5,
        bueno: esBueno,
        emoji: esBueno
          ? buenos[Math.floor(Math.random()*buenos.length)]
          : malos[Math.floor(Math.random()*malos.length)]
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


      <h3>¿Recuerdas todo lo que hemos hecho juntos? ❤️</h3>
      <p>{puntos}/10</p>
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
            {corazon.emoji}
          </div>

        ))}

      </div>

      {win && (

        <div className="win">

          <h2>¡Has recordado todos nuestros momentos!</h2>

          <p>Ya estas preparado para descubrir tu regalo</p>

          <button
            className="intro-button"
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