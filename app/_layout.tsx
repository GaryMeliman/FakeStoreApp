import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import MainNavigation from './navigations/MainNavigation';
import store from './redux/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <MainNavigation />
      </PaperProvider>
    </Provider>
  );
}
