import { useAuth } from '@contexts';

import { PrivateRoutes } from './private';
import { PublicRoutes } from './public';

import { Loading } from '@components';

import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

export function Routes() {
  const { signed, loading } = useAuth();

  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  })

  if (!fontsLoaded && loading) {
    return <Loading />
  }

  return signed ? <PrivateRoutes /> : <PublicRoutes />;
}