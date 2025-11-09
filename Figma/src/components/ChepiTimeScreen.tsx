import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Wind,
  Eye,
  Move,
  Instagram,
  Youtube,
  Facebook,
  Music2,
  ChevronDown,
  BookOpen, 
  Activity, // <-- ESTE ES EL CORRECTO, PERDÓN!
  Share2,
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

// --- LISTA DE ACTIVIDADES (PESTAÑA CALMA) ---
const calmActivities = [
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

// --- NUEVA LISTA DE RETOS (PESTAÑA ENFOQUE) ---
const focusChallenges = [
  {
    id: 'lectura',
    title: 'Pausa de Lectura',
    description: '30 min. Desconecta y lee',
    xp: 20,
    icon: BookOpen,
    color: 'bg-pink-900/30',
    buttonColor: 'bg-gradient-to-r from-pink-500 to-pink-600',
    subtasks: []
  },
  {
    id: 'movimiento',
    title: 'Movimiento Activo',
    icon: Activity,  // <-- ESTE ES EL CORRECTO
    color: 'bg-green-900/30',
    buttonColor: 'bg-gradient-to-r from-green-500 to-green-600',
    subtasks: [
      { name: 'Paseo al Aire Libre', xp: 20 },
      { name: 'Baile Libre', xp: 20 },
      { name: 'Voluntariado Local', xp: 20 },
    ]
  },
];


export function ChepiTimeScreen({ onNavigate, onBack }: ChepiTimeScreenProps) {
  const [mode, setMode] = useState<'focus' | 'zen'>('focus');
  const [isAppListOpen, setIsAppListOpen] = useState(false);
  const [blockedApps, setBlockedApps] = useState<Record<string, boolean>>({
    instagram: true,
    tiktok: true,
    youtube: false,
    facebook: true,
  });

  const [activeActivity, setActiveActivity] = useState<number | null>(null);
  
  const handleShareChallenge = async (title: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '¡Reto Chepi!',
          text: `¡Oye! Te reto a hacer esta "Pausa de ${title}" conmigo en Chepi. 🦙✨`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      alert('¡Función de compartir no disponible en este navegador!');
    }
  };


  const handleAppToggle = (appId: string) => {
    setBlockedApps((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }));
  };

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
                {mode === 'focus' ? 'Retos de Enfoque' : 'Modo Calma'}
              </h2>
              <p className="text-white/90 mt-1 text-sm">
                {mode === 'focus'
                  ? 'Elige un reto para desconectar y ganar XP.'
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

        {/* --- CONTENIDO MODO FOCUS (AHORA CON TARJETAS) --- */}
        {mode === 'focus' && (
          <div className="animate-fadeIn space-y-4">
            
            {/* Lista de Retos de Enfoque */}
            {focusChallenges.map((challenge) => {
              const Icon = challenge.icon;
              return (
                <div 
                  key={challenge.id}
                  className={`rounded-2xl p-5 border border-white/10 shadow-lg ${challenge.color}`}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-12 h-12 ${challenge.buttonColor} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white" style={{ fontSize: '18px', fontWeight: '600' }}>
                        {challenge.title}
                      </h3>
                      {challenge.subtasks.length === 0 ? (
                        <p className="text-white/80 text-sm mt-0.5">{challenge.description}</p>
                      ) : (
                        <span className="text-yellow-300 text-sm font-medium">+{challenge.subtasks[0].xp} XP por tarea</span>
                      )}
                    </div>
                  </div>

                  {challenge.subtasks.length > 0 && (
                    <div className="space-y-2 mb-4 pl-16">
                      {challenge.subtasks.map(task => (
                        <p key={task.name} className="text-white/80 text-sm">{task.name}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button
                      className={`flex-1 py-3 ${challenge.buttonColor} text-white rounded-lg hover:opacity-90 transition-all shadow-sm`}
                      style={{ fontWeight: '600' }}
                    >
                      Iniciar Reto
                    </button>
                    <button
                      onClick={() => handleShareChallenge(challenge.title)}
                      className="w-12 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all shadow-sm flex items-center justify-center"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* --- SECCIÓN DE "BLOQUEAR APPS" (SE MANTIENE) --- */}
            <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <button
                onClick={() => setIsAppListOpen(!isAppListOpen)}
                className="w-full flex items-center justify-between px-1"
              >
                <div className="flex-1 text-left">
                  <p className="text-white" style={{ fontSize: '15px', fontWeight: '600' }}>
                    Bloquear aplicaciones
                  </p>
                  <p className="text-white/80 text-xs mt-0.5">
                    Durante la sesión de enfoque
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-white/70 transition-transform duration-300 ${
                    isAppListOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isAppListOpen ? 'max-h-96 pt-4' : 'max-h-0'
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
            {/* --- FIN DE LA SECCIÓN --- */}
          </div>
        )}

        {/* --- CONTENIDO MODO ZEN (Se mantiene igual) --- */}
        {mode === 'zen' && (
          <div className="animate-fadeIn">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/10">
              <p className="text-white text-center text-sm">
                Hoy tu llama necesita un momento de paz ✨
              </p>
            </div>
            <div className="space-y-4 mb-6">
              {calmActivities.map((activity, index) => {
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
          </div>
        )}
      </div>

      <BottomNavigation currentScreen="home" onNavigate={onNavigate} />
    </div>
  );
}