import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import SCREENS from '../constants/screens';

interface RegisterScreenProps {
  onNavigate: (screen: SCREENS) => void;
  onLoginSuccess: () => void; // Para ir a 'home'
}

export function RegisterScreen({ onNavigate, onLoginSuccess }: RegisterScreenProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // CAMBIO: Fondo de gradiente a color sólido
    <div className="h-full w-full bg-[#0c2052] flex flex-col items-center justify-center px-8 text-white">
      {/* Logo */}
      <img 
        src="/logo.png" 
        alt="Chepi Logo" 
        className="mt-6 h-16 mx-auto mb-8" 
      />

      {/* Títulos */}
      <h2 className="text-4xl font-bold mb-2">Create Account</h2>
      <p className="text-white/80 mb-8">
        Already Registered?{' '}
        <button 
          onClick={() => onNavigate('login')} // Botón para ir a Login
          className="font-bold underline"
        >
          Log in here.
        </button>
      </p>

      <div className="w-full space-y-4">
        {/* CAMPO DE NOMBRE */}
        <div>
          <label className="text-xs font-bold uppercase text-white/70">NAME</label>
          <input 
            type="text"
            placeholder="Jiara Martins"
            // CAMBIO: Inputs un poco más oscuros para contrastar
            className="w-full p-4 mt-2 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-white/70 border border-white/10 focus:border-white/50 focus:outline-none"
          />
        </div>
        
        {/* CAMPO DE EMAIL */}
        <div>
          <label className="text-xs font-bold uppercase text-white/70">EMAIL</label>
          <input 
            type="email"
            placeholder="hello@reallygreatsite.com"
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

        {/* Botón de Registrarse */}
        <button 
          onClick={onLoginSuccess} // En una app real, esto haría el registro primero
          // CAMBIO: Botón con color Sky para destacar
          className="w-full p-4 mt-4 rounded-lg border border-sky-400 text-sky-400 font-bold bg-transparent hover:bg-sky-400/20 transition-colors"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}