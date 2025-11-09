import { useState, useEffect } from 'react';
import { ArrowLeft, Shuffle, Play, CheckCircle2, Flame } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import SCREENS from '../constants/screens';

interface ChepiGoScreenProps {
  onNavigate: (screen: SCREENS) => void;
  onBack: () => void;
}

export function ChepiGoScreen({ onNavigate, onBack }: ChepiGoScreenProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [streak, setStreak] = useState(4);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const challenges = [
    {
      title: 'Deja el celular por 5 minutos y estira el cuerpo',
      xp: 25,
      minutes: 5,
      icon: '🧘',
    },
    {
      title: 'Haz 3 respiraciones profundas sin mirar la pantalla',
      xp: 15,
      minutes: 2,
      icon: '🌬️',
    },
    {
      title: 'Toma un vaso de agua sin usar el teléfono',
      xp: 20,
      minutes: 3,
      icon: '💧',
    },
    {
      title: 'Mira por la ventana durante 4 minutos',
      xp: 30,
      minutes: 4,
      icon: '🌅',
    },
  ];

  const completedToday = [
    { name: 'Respiración consciente', xp: 15, icon: '🌬️' },
    { name: 'Pausa de hidratación', xp: 20, icon: '💧' },
    { name: 'Estiramiento rápido', xp: 25, icon: '🧘' },
  ];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setTimeLeft(challenges[currentChallenge].minutes * 60);
    }
  }, [isActive, timeLeft, currentChallenge, challenges]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleChangeChallenge = () => {
    const newIndex = (currentChallenge + 1) % challenges.length;
    setCurrentChallenge(newIndex);
    setTimeLeft(challenges[newIndex].minutes * 60);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentChallengeData = challenges[currentChallenge];
  const timerDuration = currentChallengeData.minutes * 60;
  const timerProgress = ((timerDuration - timeLeft) / timerDuration) * 100;

  return (
    // CAMBIO: Fondo principal Navy y texto blanco por defecto
    <div className="h-full w-full bg-[#0c2052] flex flex-col text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-4">
        <button
          onClick={onBack}
          // CAMBIO: Botón de volver sutil
          className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm mb-4 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Llama Zen Header */}
        {/* CAMBIO: Tarjeta de Header sutil */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Se mantiene el color de la llama */}
              <div className="w-20 h-20 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-5xl">🦙</div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-md border-3 border-white">
                <div className="text-xl">🔥</div>
              </div>
            </div>
            <div className="flex-1">
              {/* CAMBIO: Texto blanco */}
              <h2 className="text-white" style={{ fontSize: '24px', fontWeight: '700' }}>
                ¡Modo Activo!
              </h2>
              <p className="text-white/80 mt-1">
                Tu Llama está lista para el reto
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {/* Challenge Card */}
        {/* CAMBIO: Tarjeta de Reto sutil */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white" style={{ fontSize: '20px', fontWeight: '700' }}>
              Reto rápido
            </h3>
            <div className="text-3xl">{currentChallengeData.icon}</div>
          </div>

          <p className="text-white/90 mb-4" style={{ fontSize: '16px', lineHeight: '1.5' }}>
            {currentChallengeData.title}
          </p>

          {/* Rewards */}
          {/* CAMBIO: Recompensas con fondo sutil */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl">
              <span className="text-yellow-300" style={{ fontSize: '14px', fontWeight: '700' }}>
                +{currentChallengeData.xp} XP
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl">
              <span className="text-green-400" style={{ fontSize: '14px', fontWeight: '700' }}>
                +{currentChallengeData.minutes} min reales
              </span>
            </div>
          </div>

          {/* Timer (solo visible cuando está activo) */}
          {isActive && (
            // CAMBIO: Fondo del timer más oscuro
            <div className="mb-6 bg-black/20 rounded-2xl p-6 text-center">
              <p className="text-white/70 text-sm mb-2">Tiempo restante</p>
              {/* CAMBIO: Color de acento Sky */}
              <div className="text-sky-400" style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-0.02em' }}>
                {formatTime(timeLeft)}
              </div>
              {/* CAMBIO: Barra de progreso adaptada */}
              <div className="mt-4 h-2 bg-black/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full transition-all duration-1000"
                  style={{ width: `${timerProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleStart}
              disabled={isActive}
              // CAMBIO: Botón principal con color Sky
              className="flex-1 py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
              style={{ fontWeight: '700' }}
            >
              <Play className="w-5 h-5" />
              {isActive ? 'En curso...' : 'Iniciar'}
            </button>
            <button
              onClick={handleChangeChallenge}
              disabled={isActive}
              // CAMBIO: Botón secundario sutil
              className="px-5 py-3.5 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Shuffle className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-white/70 text-sm mt-3">
            Cambiar reto
          </p>
        </div>

        {/* Streak Indicator */}
        {/* CAMBIO: Tarjeta de Racha sutil */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-5 shadow-lg border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h4 className="text-white" style={{ fontSize: '16px', fontWeight: '600' }}>
                Racha diaria de enfoque
              </h4>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-orange-500" style={{ fontSize: '20px', fontWeight: '700' }}>
                {streak}
              </span>
              <span className="text-white/70 text-sm">días</span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          {/* CAMBIO: Fondo de barra de progreso sutil */}
          <div className="h-3 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: '80%' }} // Deberías calcular esto dinámicamente, pero se mantiene por ahora
            />
          </div>

          <p className="text-white/70 text-sm mt-2">
            ¡Casi llegas a 5 días! 🎯
          </p>
        </div>

        {/* Completed Today */}
        <div className="mb-6">
          <h4 className="text-white px-2 mb-3" style={{ fontSize: '18px', fontWeight: '600' }}>
            Completados hoy
          </h4>

          <div className="space-y-2">
            {completedToday.map((item, index) => (
              <div
                key={index}
                // CAMBIO: Tarjeta de Completados sutil
                className="bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/10 flex items-center gap-3"
              >
                <div className="w-11 h-11 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="text-xl">{item.icon}</div>
                </div>

                <div className="flex-1">
                  <p className="text-white" style={{ fontSize: '15px', fontWeight: '600' }}>
                    {item.name}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-400" style={{ fontSize: '14px', fontWeight: '700' }}>
                    +{item.xp} XP
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      {/* TODO: El BottomNavigation también necesitará un rediseño para el modo oscuro */}
      <BottomNavigation currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}