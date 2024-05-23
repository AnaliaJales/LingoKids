import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/app';
import 'firebase/database'; // import do realtime database
import { Audio } from 'expo-av';
import AlimentosScreen from './components/abas/AlimentosScreen';
import AnimaisScreen from './components/abas/AnimaisScreen';
import CategoriasScreen from './components/abas/CategoriasScreen';
import ConfiguracaoScreen from './components/abas/ConfiguracaoScreen';
import ControleParentalScreen from './components/abas/ControleParentalScreen';
import CoresScreen from './components/abas/CoresScreen';
import HomeScreen from './components/abas/HomeScreen';
import LetrasScreen from './components/abas/LetrasScreen';
import LinguagensScreen from './components/abas/LinguagensScreen';
import NumerosScreen from './components/abas/NumerosScreen';
import PartesDoCorpoScreen from './components/abas/PartesDoCorpoScreen';
import firebaseConfig from './components/database/dbConfig.js';

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => { 
  const [sound, setSound] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let soundObject = null;

    const playSound = async () => {
      try {
        soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('./assets/sons/trilha.wav'), { isLooping: true });
        setSound(soundObject);
        await soundObject.playAsync();
      } catch (error) {
        console.error('Error playing alarm:', error);
      }
    };

    playSound();

    return () => {
      if (soundObject) {
        soundObject.stopAsync();
        soundObject.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const lockScreenListener = firebase.database().ref('lockScreen');
    lockScreenListener.on('value', (snapshot) => {
      const lockData = snapshot.val();
      if (lockData) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }
    });

    const unlockTimeListener = firebase.database().ref('unlockTime');
    unlockTimeListener.on('value', (snapshot) => {
      const unlockTime = snapshot.val();
      const now = Date.now();
      if (unlockTime && now >= unlockTime) {
        firebase.database().ref('lockScreen').set(false);
      }
    });

    return () => {
      lockScreenListener.off('value');
      unlockTimeListener.off('value');
    };
  }, []);

  useEffect(() => {
    const resetLockAtMidnight = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const timeToMidnight = midnight.getTime() - now.getTime();

      setTimeout(() => {
        firebase.database().ref('lockScreen').set(false);
        resetLockAtMidnight();
      }, timeToMidnight);
    };

    resetLockAtMidnight();
  }, []);

  const stopAlarm = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Alimentos" component={AlimentosScreen} />
        <Stack.Screen name="Animais" component={AnimaisScreen} />
        <Stack.Screen name="Categorias" component={CategoriasScreen} />
        <Stack.Screen name="Controle Parental" component={ControleParentalScreen} />
        <Stack.Screen name="Cores" component={CoresScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Letras" component={LetrasScreen} />
        <Stack.Screen name="Linguagens" component={LinguagensScreen} />
        <Stack.Screen name="Numeros" component={NumerosScreen} />
        <Stack.Screen name="ParteDoCorpo" component={PartesDoCorpoScreen} />
      </Stack.Navigator>
      <ConfiguracaoScreen soundObject={sound} toggleSound={stopAlarm} />
      <Modal visible={isLocked} transparent={true}>
        <View style={styles.lockScreen}>
          <Text style={styles.lockText}>O tempo de uso acabou!</Text>
        </View>
      </Modal>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  lockScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  lockText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
