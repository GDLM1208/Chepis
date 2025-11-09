import { Ionicons } from '@expo/vector-icons';
import { Redirect, Slot, usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../constants/styles';
import { supabase } from '../lib/supabaseClient';

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setLogged(!!data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setLogged(!!session);
    });
    return () => {
      mounted = false;
      sub.subscription?.unsubscribe();
    };
  }, []);

  const getActiveTab = () => {
    if (pathname === '/' || pathname.startsWith('/home')) return 'home';
    if (pathname.startsWith('/progress')) return 'progress';
    if (pathname.startsWith('/social')) return 'social';
    if (pathname.startsWith('/achievements')) return 'achievements';
    return 'home';
  };
  const activeTab = getActiveTab();
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (checking) return null;
  if (!logged && !isAuthRoute) return <Redirect href="/login" />;
  if (logged && isAuthRoute) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4C3FAF" />
      {!isAuthRoute && (
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Chepi</Text>
            <Text style={styles.headerSubtitle}>Empieza tu camino hacia el equilibrio digital </Text>
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={() => router.push('/home')}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      {!isAuthRoute && (
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}>
            <View style={[styles.iconContainer, activeTab === 'home' && styles.iconContainerActive]}>
              <Ionicons name={activeTab === 'home' ? 'home' : 'home-outline'} size={24} color={activeTab === 'home' ? '#4C3FAF' : '#999'} />
            </View>
            <Text style={[styles.navLabel, activeTab === 'home' && styles.navLabelActive]}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/progress')}>
            <View style={[styles.iconContainer, activeTab === 'progress' && styles.iconContainerActive]}>
              <Ionicons name={activeTab === 'progress' ? 'trending-up' : 'trending-up-outline'} size={24} color={activeTab === 'progress' ? '#4C3FAF' : '#999'} />
            </View>
            <Text style={[styles.navLabel, activeTab === 'progress' && styles.navLabelActive]}>Progreso</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/social')}>
            <View style={[styles.iconContainer, activeTab === 'social' && styles.iconContainerActive]}>
              <Ionicons name={activeTab === 'social' ? 'people' : 'people-outline'} size={24} color={activeTab === 'social' ? '#4C3FAF' : '#999'} />
            </View>
            <Text style={[styles.navLabel, activeTab === 'social' && styles.navLabelActive]}>Social</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/achievements')}>
            <View style={[styles.iconContainer, activeTab === 'achievements' && styles.iconContainerActive]}>
              <Ionicons name={activeTab === 'achievements' ? 'trophy' : 'trophy-outline'} size={24} color={activeTab === 'achievements' ? '#4C3FAF' : '#999'} />
            </View>
            <Text style={[styles.navLabel, activeTab === 'achievements' && styles.navLabelActive]}>Logros</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
