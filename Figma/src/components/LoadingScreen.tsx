// Ya no necesitamos 'useEffect' o 'useState' para la barra de progreso
export function LoadingScreen() {
  return (
    <>
      {/* Añadimos el CSS para la animación de los puntos que crecen y decrecen.
        Esto es lo que pediste: "UNO SE HACE GRANDE LUEGO SE HACE PEQUEÑO..."
      */}
      <style>
        {`
          @keyframes bounce-dot {
            0%, 80%, 100% {
              transform: scale(0.8);
              opacity: 0.5;
            }
            40% {
              transform: scale(1.2);
              opacity: 1;
            }
          }

          .dot-1 {
            animation: bounce-dot 1.4s infinite ease-in-out both;
            animation-delay: -0.32s;
          }
          .dot-2 {
            animation: bounce-dot 1.4s infinite ease-in-out both;
            animation-delay: -0.16s;
          }
          .dot-3 {
            animation: bounce-dot 1.4s infinite ease-in-out both;
          }
        `}
      </style>

      {/* CAMBIO: Fondo con gradiente de azul oscuro a azul claro */}
      <div className="h-full w-full bg-gradient-to-b from-[#0c2052] to-sky-500 flex flex-col items-center justify-center px-8">
        
        <div className="flex flex-col items-center justify-center">

          {/* CAMBIO: Logo 'logo.png' grande en el centro */}
          <img 
            src="/logo.png" 
            alt="Chepi Logo"
            // Hacemos el logo grande (80% del ancho, máximo 280px)
            className="w-4/5 max-w-[280px] mb-16" 
          />

          {/* CAMBIO: Animación de 3 puntos */}
          <div className="flex space-x-2 mb-4">
            <span className="dot-1 w-3 h-3 bg-white rounded-full"></span>
            <span className="dot-2 w-3 h-3 bg-white rounded-full"></span>
            <span className="dot-3 w-3 h-3 bg-white rounded-full"></span>
          </div>

          {/* CAMBIO: Texto de la imagen */}
          <p className="text-white/80 text-center">
            Menos scroll, más vida real.
          </p>
        </div>

      </div>
    </>
  );
}