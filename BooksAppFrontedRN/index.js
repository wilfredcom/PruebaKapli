import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
import { Platform } from 'react-native';

// Importa la biblioteca de iconos
import Icon from 'react-native-vector-icons/FontAwesome';
import { SimpleApp } from './src/SimpleApp';

// Configura los iconos para Android e iOS
if (Platform.OS === 'android') {
  enableScreens();
}
Icon.loadFont();
// Inicia tu aplicación
AppRegistry.registerComponent(appName, () => SimpleApp);

