import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Play,
  Square,
  Sparkles,
  Wind,
  Eye,
  Move,
  Instagram,
  Youtube,
  Facebook,
  Music2,
  ChevronDown, // --- 1. ICONO AÑADIDO ---
} from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import SCREENS from '../constants/screens';

interface ChepiTimeScreenProps {
  onNavigate: (screen: SCREENS) => void;
  onBack: () => void;
}

const socialApps = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'tiktok', name: 'TikTok', icon: Music2 },
  { id: 'youtube', name: 'YouTube', icon: Youtube },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
];

export function ChepiTimeScreen({ onNavigate, onBack }: ChepiTimeScreenProps) {
  // --- ESTADO GLOBAL DE LA PANTALLA ---
  const [mode, setMode] = useState<'focus' | 'zen'>('focus');

  // --- 2. NUEVO ESTADO PARA CONTROLAR LA LISTA ---
  const [isAppListOpen, setIsAppListOpen] = useState(false); // Empieza cerrada

  // --- ESTADO PARA MODO 'FOCUS' (Timer) ---
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalTime] = useState(25 * 60);
  const [showComplete, setShowComplete] = useState(false);
  const [blockedApps, setBlockedApps] = useState<Record<string, boolean>>({
    instagram: true,
    tiktok: true,
    youtube: false,
    facebook: true,
  });

  // --- ESTADO PARA MODO 'ZEN' (Actividades) ---
  const [calmMinutes] = useState(12);
  const [activeActivity, setActiveActivity] = useState<number | null>(null);

  const activities = [
    {
      title: 'Respira 2 minutos',
      description: 'Respiración guiada profunda',
      duration: 2,
      xp: 30,
      icon: Wind,
      gradient: 'from-teal-400 to-teal-500',
    },
    {
      title: 'Pausa consciente',
      description: 'Cierra los ojos y conecta',
      duration: 1,
      xp: 20,
      icon: Eye,
      gradient: 'from-purple-400 to-purple-500',
    },
    {
      title: 'Estira y reinicia',
      description: 'Movimiento consciente',
      duration: 3,
      xp: 35,
      icon: Move,
      gradient: 'from-green-400 to-green-500',
    },
  ];

  // --- LÓGICA DEL TIMER (Modo Focus) ---
  useEffect(() => {
    if (mode === 'focus' && isActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setShowComplete(true);
            setTimeout(() => setShowComplete(false), 3000);
            return totalTime;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isActive, timeLeft, totalTime, mode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // --- Variables de UI para el Timer ---
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const circumference = 2 * Math.PI * 120; // radio de 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(totalTime);
  };

  const handleAppToggle = (appId: string) => {
    setBlockedApps((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }));
  };

  // --- RENDERIZADO DEL COMPONENTE ---
  return (
    <div className="h-full w-full bg-[#0c2052] flex flex-col text-white">
      {/* Header (Botón de volver y Título) */}
      <div className="px-6 pt-12 pb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm mb-4 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-5xl">🦙</div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-md border-3 border-white">
                <div className="text-lg">{mode === 'focus' ? '🎧' : '🧘'}</div>
              </div>
            </div>
            <div className="flex-1">
              <h2
                className="text-white"
                style={{ fontSize: '24px', fontWeight: '700' }}
              >
                Modo Chepi-Time
              </h2>
              <p className="text-white/90 mt-1 text-sm">
                {mode === 'focus'
                  ? 'Enfócate en lo que importa. Tu llama cuidará del resto 💪'
                  : 'Respira hondo y vuelve a tu equilibrio 🌿'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Contenido Principal (con Pestañas) --- */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        {/* --- PESTAÑAS (Tabs) --- */}
        <div className="flex bg-black/20 backdrop-blur-md rounded-xl p-1 mb-6 border border-white/10">
          <button
            onClick={() => setMode('focus')}
            className={`flex-1 py-3 rounded-lg text-white transition-all ${
              mode === 'focus' ? 'bg-white/10 shadow' : 'text-white/70'
            }`}
            style={{ fontWeight: '600' }}
          >
            Enfoque
          </button>
          <button
            onClick={() => setMode('zen')}
            className={`flex-1 py-3 rounded-lg text-white transition-all ${
              mode === 'zen' ? 'bg-white/10 shadow' : 'text-white/70'
            }`}
            style={{ fontWeight: '600' }}
          >
            Calma
          </button>
        </div>

        {/* --- CONTENIDO MODO FOCUS --- */}
        {mode === 'focus' && (
          <div className="animate-fadeIn">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/10">
              <p className="text-white text-center text-sm">
                Cada minuto enfocado es un paso hacia tu equilibrio digital ✨
              </p>
            </div>

            {/* Circular Timer */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-72 h-72 mb-6">
                <svg className="w-full h-full -rotate-90 transform">
                  <circle
                    cx="144"
                    cy="144"
                    r="120"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="144"
                    cy="144"
                    r="120"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                    style={{
                      filter: showComplete
                        ? 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.8))'
                        : 'none',
                    }}
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="100%" stopColor="#7DD3FC" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="bg-white/5 backdrop-blur-lg rounded-full w-52 h-52 flex flex-col items-center justify-center shadow-xl border border-white/10">
                    {showComplete && (
                      <div className="absolute inset-0 bg-sky-400/30 rounded-full animate-ping" />
                    )}
                    <div
                      className="text-white relative z-10"
                      style={{
                        fontSize: '56px',
                        fontWeight: '700',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {formatTime(timeLeft)}
                    </div>
                    <p className="text-white/80 mt-2 text-sm">
                      {isActive ? 'Tiempo restante' : 'Listo para enfocarte'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-3 mb-6">
                {!isActive ? (
                  <button
                    onClick={handleStart}
                    className="w-full py-4 bg-[#FF888] text-white rounded-2xl hover:bg-opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                    style={{ fontWeight: '700', fontSize: '16px' }}
                  >
                    <Play className="w-5 h-5" fill="currentColor" />
                    Iniciar sesión de enfoque
                  </button>
                ) : (
                  <button
                    onClick={handleStop}
                    className="w-full py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
                    style={{ fontWeight: '600', fontSize: '16px' }}
                  >
                    <Square className="w-5 h-5" fill="currentColor" />
                    Finalizar antes
                  </button>
                )}
              </div>

              {/* --- 3. SECCIÓN DE "BLOQUEAR APPS" COLAPSABLE --- */}
              <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 mb-6">
                {/* Título/Botón Colapsable */}
                <button
                  onClick={() => setIsAppListOpen(!isAppListOpen)}
                  className="w-full flex items-center justify-between px-1"
                >
                  <div className="flex-1 text-left">
                    <p
                      className="text-white"
                      style={{ fontSize: '15px', fontWeight: '600' }}
                    >
                      Bloquear aplicaciones
                    </p>
                    <p className="text-white/80 text-xs mt-0.5">
                      Durante la sesión de enfoque
                    </p>
                  </div>
                  {/* Icono de Flecha Animado */}
                  <ChevronDown
                    className={`w-5 h-5 text-white/70 transition-transform duration-300 ${
                      isAppListOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {/* Lista de Apps (Colapsable con animación) */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isAppListOpen ? 'max-h-96 pt-4' : 'max-h-0' // pt-4 añade espacio
                  }`}
                >
                  <div className="space-y-2">
                    {socialApps.map((app) => {
                      const isBlocked = blockedApps[app.id] ?? false;
                      const Icon = app.icon;
                      return (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-white/90" />
                            <span className="text-white/90">{app.name}</span>
                          </div>
                          <button
                            onClick={() => handleAppToggle(app.id)}
                            className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                              isBlocked ? 'bg-sky-500' : 'bg-black/30'
                            }`}
                          >
                            <div
                              className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform duration-300 ${
                                isBlocked
                                  ? 'translate-x-6 bg-white'
                                  : 'translate-x-0 bg-gray-400'
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* --- FIN DE LA SECCIÓN ACTUALIZADA --- */}


              {/* Rewards Info */}
              <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <h4
                    className="text-white"
                    style={{ fontSize: '16px', fontWeight: '600' }}
                  >
                    Recompensa al completar
                  </h4>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div
                      className="text-yellow-300"
                      style={{ fontSize: '24px', fontWeight: '700' }}
                    >
                      +100 XP
                    </div>
                    <p className="text-white/80 text-xs mt-1">Experiencia</p>
                  </div>
                  <div className="w-px h-10 bg-white/30" />
                  <div className="text-center">
                    <div
                      className="text-yellow-300"
                      style={{ fontSize: '24px', fontWeight: '7700' }}
                    >
                      +25 min
                    </div>
                    <p className="text-white/80 text-xs mt-1">Tiempo real</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- CONTENIDO MODO ZEN --- */}
        {mode === 'zen' && (
          <div className="animate-fadeIn">
            {/* Mensaje Motivacional Zen */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/10">
              <p className="text-white text-center text-sm">
                Hoy tu llama necesita un momento de paz ✨
              </p>
            </div>

            {/* Lista de Actividades (adaptada al tema oscuro) */}
            <div className="space-y-4 mb-6">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                const isActive = activeActivity === index;

                return (
                  <div
                    key={index}
                    className={`bg-white/5 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-white/10 transition-all duration-500 ${
                      isActive ? 'scale-105 shadow-lg' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="relative">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-14 h-14 bg-gradient-to-br ${activity.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3
                            className="text-white"
                            style={{ fontSize: '18px', fontWeight: '600' }}
                          >
                            {activity.title}
                          </h3>
                          <p className="text-white/80 text-sm mt-0.5">
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-white/70 text-sm">
                            {activity.duration} min
                          </span>
                        </div>
                      </div>

                      {/* Recompensas (adaptadas) */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl">
                          <span
                            className="text-yellow-300"
                            style={{ fontSize: '13px', fontWeight: '700' }}
                          >
                            +{activity.xp} XP
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl">
                          <span
                            className="text-white/90"
                            style={{ fontSize: '13px', fontWeight: '700' }}
                          >
                            +{activity.duration} min calma
                          </span>
                        </div>
                      </div>

                      {/* Botón de Empezar */}
                      <button
                        onClick={() => setActiveActivity(isActive ? null : index)}
                        className={`w-full py-3 bg-gradient-to-r ${activity.gradient} text-white rounded-2xl hover:opacity-90 transition-all duration-300 shadow-sm ${
                          isActive ? 'opacity-90' : ''
                        }`}
                        style={{ fontWeight: '600' }}
                      >
                        {isActive ? 'En curso...' : 'Empezar'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progreso de Minutos de Calma (adaptado) */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4
                  className="text-white"
                  style={{ fontSize: '16px', fontWeight: '600' }}
                >
                  Minutos de calma de hoy
                </h4>
                <div className="flex items-center gap-2">
                  <span
                    className="text-white"
                    style={{ fontSize: '24px', fontWeight: '700' }}
                  >
                    {calmMinutes}
                  </span>
                  <span className="text-white/80 text-sm">min</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2.5 rounded-full transition-all duration-500 ${
                      i < Math.floor(calmMinutes / 5)
                        ? 'bg-gradient-to-r from-teal-400 to-teal-500'
                        : 'bg-black/30'
                    }`}
                  />
                ))}
              </div>
              <p className="text-white/80 text-sm text-center mt-3">
                ¡Vas muy bien! Meta: 25 min 🎯
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navegación Inferior */}
      <BottomNavigation currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}