import { UserPlus, Eye } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import SCREENS from '../constants/screens';

interface SocialScreenProps {
  onNavigate: (screen: SCREENS) => void;
}

export function SocialScreen({ onNavigate }: SocialScreenProps) {
  const friends = [
    { name: 'María Pérez', level: 12, points: 2450, emoji: '🦙', status: 'calma' },
    { name: 'Alex Rivera', level: 10, points: 2100, emoji: '🦙', status: 'feliz' },
    { name: 'Juan Kim', level: 15, points: 3200, emoji: '🦙', status: 'enfocado' },
    { name: 'Sofía Wong', level: 8, points: 1850, emoji: '🦙', status: 'cansado' },
    { name: 'Luis Gonzáles', level: 11, points: 2380, emoji: '🦙', status: 'feliz' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'feliz': return 'from-yellow-400 to-yellow-500';
      case 'calma': return 'from-teal-400 to-teal-500';
      case 'enfocado': return 'from-purple-400 to-purple-500';
      case 'cansado': return 'from-gray-400 to-gray-500';
      default: return 'from-blue-400 to-blue-500';
    }
  };

  const handleInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Únete a mi Círculo de Balance en Chepi',
          text: '¡Oye! Te invito a unirte a Chepi, una app para mejorar nuestro bienestar digital. 🦙✨',
          url: window.location.href,
        });
        console.log('Amigo invitado');
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      alert('¡Imagina que estás abriendo el menú de compartir ahora mismo!');
    }
  };

  return (
    <div className="h-full w-full bg-[#0c2052] flex flex-col text-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h2 className="text-white" style={{ fontSize: '28px', fontWeight: '600' }}>
          Círculo de Balance
        </h2>
        <p className="text-white/70 mt-1">Comparte tu progreso y motiva a tus amigos</p>
      </div>

      {/* Friends List */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="space-y-3 mb-6">
          {friends.map((friend, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/10 flex items-center gap-4"
            >
              {/* Avatar */}
              <div className="relative">
                <div className={`w-14 h-14 bg-gradient-to-br ${getStatusColor(friend.status)} rounded-full flex items-center justify-center shadow-md`}>
                  <div className="text-2xl">{friend.emoji}</div>
                </div>
                {/* Level Badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white text-xs border-2 border-[#0c2052]" style={{ fontWeight: '700' }}>
                  {friend.level}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-white" style={{ fontSize: '16px', fontWeight: '600' }}>
                  {friend.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/70 text-sm">Nivel {friend.level}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-yellow-300 text-sm" style={{ fontWeight: '600' }}>
                    {friend.points.toLocaleString()} pts
                  </span>
                </div>
              </div>

              {/* View Button */}
              <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                <Eye className="w-5 h-5 text-sky-400" />
              </button>
            </div>
          ))}
        </div>

        {/* Invite Friends Button */}
        <button
          onClick={handleInvite}
          // CAMBIO: Fondo con gradiente más pronunciado y sombra más grande
          className="w-full bg-gradient-to-r from-[#FF888] to-orange-500 text-white rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-shadow flex items-center justify-center gap-2 mt-6" // CAMBIO: mt-6
          style={{ fontWeight: '700' }} // CAMBIO: FontWeight más alto
        >
          <UserPlus className="w-5 h-5" />
          Invitar Amigos
        </button>

        {/* Leaderboard Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/10 mt-6">
          <h3 className="text-white mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
            Tus Estadísticas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 rounded-2xl p-4 text-center">
              <div className="text-sky-400" style={{ fontSize: '24px', fontWeight: '700' }}>
                #3
              </div>
              <p className="text-white/70 text-sm mt-1">Rango</p>
            </div>
            <div className="bg-black/20 rounded-2xl p-4 text-center">
              <div className="text-sky-400" style={{ fontSize: '24px', fontWeight: '700' }}>
                2,680
              </div>
              <p className="text-white/70 text-sm mt-1">Puntos Totales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentScreen="social" onNavigate={onNavigate} />
    </div>
  );
}