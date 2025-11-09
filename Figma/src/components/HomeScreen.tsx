// 1. Ya no se usa 'Focus', lo quitamos de la importación
import { Sparkles, Timer } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import SCREENS from '../constants/screens';

interface HomeScreenProps {
  onNavigate: (screen: SCREENS) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    // CAMBIO: Fondo principal Navy y texto blanco por defecto
    <div className="h-full w-full bg-[#0c2052] flex flex-col text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        {/* CAMBIO: Texto claro */}
        <p className="text-white/70">¡Buenos días!</p>
        <h2 className="text-white mt-1" style={{ fontSize: '28px', fontWeight: '600' }}>
          Llama Zen
        </h2>
      </div>

      {/* Llama Avatar Section */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {/* CAMBIO: Tarjeta principal más sutil */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 mb-6 shadow-lg border border-white/10">
          {/* Llama Character */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              {/* CAMBIO: Fondo de la Llama (usando el mismo de ChepiTime) */}
              <div className="w-40 h-40 overflow-hidden bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full flex items-center justify-center shadow-lg">
                <img src="/llama.jpg" alt="Llama" style={{ height: '75%', objectFit: 'cover' }}/>
              </div>
              {/* Indicador de emoción (se mantiene) */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-md border-4 border-white">
                <div className="text-2xl">😊</div>
              </div>
            </div>
          </div>

          {/* Speech Bubble */}
          {/* CAMBIO: Burbuja de chat más oscura */}
          <div className="bg-black/20 rounded-2xl p-4 shadow-sm relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/20 rotate-45" />
            <p className="text-white/90 text-center relative z-10">
              "¡Lo estás haciendo genial! Mantén tu equilibrio digital hoy."
            </p>
          </div>
        </div>

        {/* Mode Cards */}
        <div className="space-y-3">
          <h3 className="text-white px-2 mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
            Elige tu modo
          </h3>

          {/* CAMBIO: Botón/Tarjeta con estilo oscuro */}
          <button
            onClick={() => onNavigate('chepi-go')}
            className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-sm hover:bg-white/10 transition-shadow flex items-center gap-4 border border-white/10"
          >
            {/* CAMBIO: Icono con color Sky (azul) */}
            <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-white" style={{ fontSize: '16px', fontWeight: '600' }}>Chepi-Go</h4>
              <p className="text-white/70 text-sm">Retos activos de bienestar</p>
            </div>
          </button>

          {/* CAMBIO: Botón/Tarjeta con estilo oscuro */}
          <button
            onClick={() => onNavigate('chepi-time')}
            className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-sm hover:bg-white/10 transition-shadow flex items-center gap-4 border border-white/10"
          >
            {/* CAMBIO: Icono con color Coral/Naranja */}
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF888] to-orange-500 rounded-xl flex items-center justify-center">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-white" style={{ fontSize: '16px', fontWeight: '600' }}>Chepi-Time</h4>
              <p className="text-white/70 text-sm">Sesiones de enfoque y calma</p>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      {/* TODO: El BottomNavigation también necesitará un rediseño para el modo oscuro */}
      <BottomNavigation currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}