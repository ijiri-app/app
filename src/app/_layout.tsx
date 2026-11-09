import '../global.css';

import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono/500Medium';
import { FugazOne_400Regular } from '@expo-google-fonts/fugaz-one/400Regular';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Freesentation-Regular': require('@/assets/fonts/Freesentation-4Regular.ttf'),
    'Freesentation-Medium': require('@/assets/fonts/Freesentation-5Medium.ttf'),
    'Freesentation-SemiBold': require('@/assets/fonts/Freesentation-6SemiBold.ttf'),
    'JetBrainsMono-Medium': JetBrainsMono_500Medium,
    'FugazOne-Regular': FugazOne_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#111418' }}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
      <Stack.Screen name="upload" options={{ presentation: 'modal' }} />
    </Stack>
    </GestureHandlerRootView>
  );
}
