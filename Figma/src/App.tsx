import { useEffect, useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { HomeScreen } from './components/HomeScreen';
import { ChallengesScreen } from './components/ChallengesScreen';
import { SocialScreen } from './components/SocialScreen';
import { ChepiGoScreen } from './components/ChepiGoScreen';
// import { ChepiZenScreen } from './components/ChepiZenScreen'; // <- 1. LÍNEA ELIMINADA
import { ChepiTimeScreen } from './components/ChepiTimeScreen';
import SCREENS from './constants/screens';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<SCREENS>('welcome');

  useEffect(() => {
    if (currentScreen === 'loading') {
      console.log("loading");
      const timer = setTimeout(() => setCurrentScreen('home'), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-50">
      {/* Mobile Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden">
        {currentScreen === 'welcome' && <WelcomeScreen onStart={() => setCurrentScreen('loading')} />}
        {currentScreen === 'loading' && <LoadingScreen />}
        {currentScreen === 'home' && <HomeScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'challenges' && <ChallengesScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'social' && <SocialScreen onNavigate={setCurrentScreen} />}
        {currentScreen === 'chepi-go' && <ChepiGoScreen onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />}
        
        {/* {currentScreen === 'chepi-zen' && <ChepiZenScreen onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />} // <- 2. LÍNEA ELIMINADA */}
        
        {currentScreen === 'chepi-time' && <ChepiTimeScreen onNavigate={setCurrentScreen} onBack={() => setCurrentScreen('home')} />}
      </div>
    </div>
  );
}