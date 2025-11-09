import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import SCREENS from '../constants/screens';

interface LoginScreenProps {
  onNavigate: (screen: SCREENS) => void;
  onLoginSuccess: () => void; // Para ir a 'home'
}

export function LoginScreen({ onNavigate, onLoginSuccess }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // CAMBIO: Fondo de gradiente a color sólido
    <div className="h-full w-full bg-[#0c2052] flex flex-col items-center justify-center px-8 text-white">
      <img
        src="/logo.png"
        alt="Chepi Logo"
        className="mt-6 h-32 mx-auto mb-8"
      />

      {/* Título de Login */}
      <h2 className="text-4xl font-bold mb-2">Iniciar Sesión</h2>
      <p className="text-white/80 mb-8">
        ¿Nuevo en Chepi?{' '}
        <button
          onClick={() => onNavigate('register')} // Botón para ir a Registro
          className="font-bold underline"
        >
          Crea una cuenta.
        </button>
      </p>

      <div className="w-full space-y-4">
        {/* CAMPO DE EMAIL */}
        <div>
          <label className="text-xs font-bold uppercase text-white/70">EMAIL</label>
          <input
            type="email"
            placeholder="hello@world.com"
            className="w-full p-4 mt-2 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-white/70 border border-white/10 focus:border-white/50 focus:outline-none"
          />
        </div>

        {/* CAMPO DE CONTRASEÑA */}
        <div>
          <label className="text-xs font-bold uppercase text-white/70">PASSWORD</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="******"
              className="w-full p-4 mt-2 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-white/70 border border-white/10 focus:border-white/50 focus:outline-none"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 mt-1"
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-white/70" /> : <Eye className="w-5 h-5 text-white/70" />}
            </button>
          </div>
        </div>

        {/* Botón de Log In */}
        <button
          onClick={onLoginSuccess} // Simula un login exitoso
          // CAMBIO: Botón con color Sky para destacar
          className="w-full p-4 mt-4 rounded-lg border border-sky-400 text-sky-400 font-bold bg-transparent hover:bg-sky-400/20 transition-colors"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}