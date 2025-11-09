interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div
      className="bg-[#0c2052] h-full w-full flex flex-col items-center justify-between p-8 cursor-pointer"
      onClick={onStart}
    >
      <div className="max-w-[75%] h-[120px] overflow-hidden flex-1 flex items-center justify-center">
        <img
          src="/llama-animada.gif"
          alt="Llama animada"
          className="max-w-[650px] h-auto object-fill"
        />
      </div>

      {/* Texto de Bienvenida */}
      <div className="text-center pb-18">
        <span className="text-white text-2xl font-bold">Hola!</span>
        <br />
        <span className="text-white text-xl" >Soy Chepi</span>
      </div>


      {/* Botón abajo */}
      <div className="pb-12">
        <div className="px-12 py-4 bg-[#2ea3d6] rounded-full shadow-lg">
          <p className="text-white text-xl font-semibold text-center">
            Toca para empezar
          </p>
        </div>

      </div>
    </div>
  );
}