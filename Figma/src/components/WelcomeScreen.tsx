interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div
      className="bg-[#0c2052] h-full w-full flex flex-col items-center justify-between p-8 cursor-pointer"
      onClick={onStart}
    >
      <div className="flex items-center justify-center">
        <img
          src="/llama-animada.gif"
          alt="Llama animada"
          className="rounded-4xl max-w-[65%] h-auto object-contain"
        />
      </div>

      {/* Texto de Bienvenida */}
      <div className="font-sans text-center pb-18">
        <span className="text-white text-5xl font-bold">Hola!</span>
        <br />
        <span className="text-white text-4xl" >Soy Chepi</span>
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