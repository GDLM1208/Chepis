import { Moon, Zap, Coffee } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import SCREENS from '../constants/screens';

interface ChallengesScreenProps {
  onNavigate: (screen: SCREENS) => void;
}

export function ChallengesScreen({ onNavigate }: ChallengesScreenProps) {
  // CAMBIO: Contenido traducido a español
  const challenges = [
    {
      icon: Moon,
      title: 'Hora Dorada',
      description: '1h antes de dormir',
      xp: 100,
      progress: 65,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Zap,
      title: 'Power Hour',
      description: '1h de trabajo enfocado',
      xp: 75,
      progress: 40,
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Coffee,
      title: 'Comida Consciente',
      description: 'Sin celular en comidas',
      xp: 50,
      progress: 80,
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    // CAMBIO: Fondo principal Navy y texto blanco
    <div className="h-full w-full bg-[#0c2052] flex flex-col text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        {/* CAMBIO: Texto traducido y con color blanco */}
        <h2 className="text-white" style={{ fontSize: '28px', fontWeight: '600' }}>
          Ayuda a tu Llama Zen
        </h2>
        <p className="text-white/70 mt-1">Completa retos para ganar XP</p>
      </div>

      {/* Challenges */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="space-y-4 mb-8">
          {challenges.map((challenge) => (
            <div
              key={challenge.title}
              // CAMBIO: Tarjetas con estilo oscuro sutil
              className="bg-white/5 backdrop-blur-md rounded-3xl p-5 shadow-lg border border-white/10"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${challenge.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <challenge.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  {/* CAMBIO: Texto de tarjeta oscuro -> blanco */}
                  <h3 className="text-white" style={{ fontSize: '18px', fontWeight: '600' }}>
                    {challenge.title}
                  </h3>
                  <p className="text-white/70 text-sm">{challenge.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {/* CAMBIO: XP color a amarillo/dorado */}
                    <span className="text-yellow-300" style={{ fontSize: '14px', fontWeight: '600' }}>
                      +{challenge.xp} XP
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  {/* CAMBIO: Texto traducido y color */}
                  <span>Progreso</span>
                  <span>{challenge.progress}%</span>
                </div>
                {/* CAMBIO: Fondo de barra de progreso oscuro */}
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${challenge.color} rounded-full transition-all`}
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
              </div>

              {/* Start Button */}
              <button className={`w-full py-3 bg-gradient-to-r ${challenge.color} text-white rounded-xl hover:opacity-90 transition-opacity`} style={{ fontWeight: '600' }}>
                {/* CAMBIO: Texto traducido */}
                Iniciar Reto
              </button>
            </div>
          ))}
        </div>

        {/* Today's Summary */}
        {/* CAMBIO: Tarjeta de Resumen con estilo oscuro */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/10 mb-6">
          <h3 className="text-white mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
            {/* CAMBIO: Texto traducido */}
            Resumen de Hoy
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              {/* CAMBIO: Color de estadísticas a Sky */}
              <div className="text-sky-400" style={{ fontSize: '24px', fontWeight: '700' }}>
                3.2h
              </div>
              <p className="text-white/70 text-sm mt-1">Tiempo en Pantalla</p>
            </div>
            <div className="text-center">
              <div className="text-sky-400" style={{ fontSize: '24px', fontWeight: '700' }}>
                225
              </div>
              <p className="text-white/70 text-sm mt-1">XP Ganado</p>
            </div>
            <div className="text-center">
              <div className="text-sky-400" style={{ fontSize: '24px', fontWeight: '700' }}>
                2/3
              </div>
              <p className="text-white/70 text-sm mt-1">Completados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      {/* TODO: El BottomNavigation también necesitará un rediseño para el modo oscuro */}
      <BottomNavigation currentScreen="challenges" onNavigate={onNavigate} />
    </div>
  );
}