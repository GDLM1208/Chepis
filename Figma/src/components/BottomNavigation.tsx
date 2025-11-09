import { Home, TrendingUp, Users, Trophy } from 'lucide-react';
// Asumo que SCREENS está en esta ruta, como en tus otros archivos
import SCREENS from '../constants/screens';

interface BottomNavigationProps {
  // CAMBIO: Añadí 'achievements' al tipo para que sea completo
  currentScreen: 'home' | 'challenges' | 'social' | 'achievements';
  onNavigate: (screen: SCREENS) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'challenges' as const, icon: TrendingUp, label: 'Progress' },
    { id: 'social' as const, icon: Users, label: 'Social' },
    { id: 'achievements' as const, icon: Trophy, label: 'Achievements' },
  ];

  return (
    // CAMBIO: Fondo de tarjeta de vidrio esmerilado y borde sutil
    <div className="bg-white/5 backdrop-blur-md border-t border-white/10 px-4 py-3">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                // Tu lógica original (Achievements no es navegable)
                if (item.id !== 'achievements') {
                  onNavigate(item.id);
                }
              }}
              // CAMBIO: Hover sutil y estado deshabilitado para 'Achievements'
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                item.id === 'achievements'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white/10'
              }`}
            >
              <Icon
                // CAMBIO: Colores de icono Activo/Inactivo
                className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/60'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                // CAMBIO: Colores de texto Activo/Inactivo y peso de fuente
                className={`text-xs ${isActive ? 'text-white' : 'text-white/60'}`}
                style={{ fontWeight: isActive ? '600' : '500' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}