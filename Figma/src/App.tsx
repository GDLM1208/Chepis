import { useEffect, useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { HomeScreen } from './components/HomeScreen';
import { ChallengesScreen } from './components/ChallengesScreen';
import { SocialScreen } from './components/SocialScreen';
import { ChepiGoScreen } from './components/ChepiGoScreen';
import { ChepiTimeScreen } from './components/ChepiTimeScreen';

// 1. Importar las nuevas pantallas
import { LoginScreen } from './components/LoginScreen'; 
import { RegisterScreen } from './components/RegisterScreen';

import SCREENS from './constants/screens';

export default function App() {
  // 2. CAMBIO: Empezamos en 'loading' para ver la nueva pantalla de bienvenida
  const [currentScreen, setCurrentScreen] = useState<SCREENS>('loading');

  useEffect(() => {
    if (currentScreen === 'loading') {
      console.log("loading");
      // 3. CAMBIO: Después de 3s, ir a 'login' en lugar de 'home'
      const timer = setTimeout(() => setCurrentScreen('login'), 3000); 
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // 4. Función para pasar a 'home' después de un login/registro exitoso
  const handleLoginSuccess = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-50">
      <div className="relative w-full max-w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden">
        
        {/* 5. Lógica de renderizado actualizada */}
        
        {currentScreen === 'loading' && <LoadingScreen />}

        {/* 6. Añadir las nuevas pantallas al renderizado */}
        {currentScreen === 'login' && (
          <LoginScreen 
            onNavigate={setCurrentScreen} 
            onLoginSuccess={handleLoginSuccess} 
          />
        )}
        {currentScreen === 'register' && (
          <RegisterScreen 
            onNavigate={setCurrentScreen} 
            onLoginSuccess={handleLoginSuccess} 
          />
        )}

        {/* El resto de tus pantallas */}
        {currentScreen === 'home' && <HomeScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'challenges' && <ChallengesScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'social' && <SocialScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'chepi-go' && <ChepiGoScreen onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />}
        {currentScreen === 'chepi-time' && <ChepiTimeScreen onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />}
      </div>
    </div>
  );
}