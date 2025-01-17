import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase/app';
import 'firebase/database';
import VoltarScreen from './VoltarScreen';

const ControleParentalScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [duration, setDuration] = useState('');

  const setTimer = () => {
    const time = parseInt(duration);
    if (isNaN(time) || time <= 0) return;

    const unlockTime = Date.now() + time * 1000;
    firebase.database().ref('lockScreen').set(true);
    firebase.database().ref('unlockTime').set(unlockTime);
  };

  const toggleCheckbox = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
    let durationInSeconds;
    switch (option) {
      case '30m':
        durationInSeconds = 1800;
        break;
      case '1h':
        durationInSeconds = 3600;
        break;
      case '2h':
        durationInSeconds = 7200;
        break;
      case '3h':
        durationInSeconds = 10800;
        break;
      default:
        durationInSeconds = 0;
    }
    setDuration(durationInSeconds.toString());
  };

  const renderBallPosition = (option) => selectedOption === option ? 36 : 4;

  return (
    <LinearGradient colors={['#E9971D', '#F6F89A', '#E9971D']} style={styles.container}>
      <VoltarScreen />
      <Image style={styles.tempoDetela} source={require('../../assets/imagens/tempo.png')} />
      <View style={styles.controleParentalContainer}>
        <Image style={styles.background} source={require('../../assets/imagens/controleParentalContainer.png')} />
        <View style={styles.horasContainer}>
          <Image style={styles.trinta} source={require('../../assets/imagens/30m.png')} />
          <Image style={styles.uma} source={require('../../assets/imagens/1h.png')} />
          <Image style={styles.duas} source={require('../../assets/imagens/2h.png')} />
          <Image style={styles.tres} source={require('../../assets/imagens/3h.png')} />
        </View>
        <View style={styles.checkboxContainer}>
          {['30m', '1h', '2h', '3h'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.checkbox, { backgroundColor: selectedOption === option ? '#4BD609' : '#FECE00' }]}
              onPress={() => toggleCheckbox(option)}
            >
              <Animated.View style={[styles.ball, { left: renderBallPosition(option) }]} />
            </TouchableOpacity>
          ))}
        </View>
        <Button title="Set Timer" onPress={setTimer} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempoDetela: {
    marginLeft: 15,
    width: 270,
    height: 32,
    marginTop: 30,
  },
  controleParentalContainer: {
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 20,
  },
  background: {
    width: 320,
    height: 446.09,
  },
  horasContainer: {
    marginTop: -380,
  },
  trinta: {
    width: 90,
    height: 35,
    marginBottom: 53,
    marginRight: 130,
  },
  uma: {
    width: 45,
    height: 35,
    marginBottom: 53,
    marginLeft: 20,
  },
  duas: {
    width: 49,
    height: 35,
    marginBottom: 53,
    marginLeft: 20,
  },
  tres: {
    width: 53,
    height: 35,
    marginLeft: 20,
  },
  checkboxContainer: {
    marginLeft: 120,
    marginTop: -300,
  },
  checkbox: {
    width: 62,
    height: 32,
    borderRadius: 16,
    borderColor: 'white',
    borderWidth: 3,
    marginBottom: 57,
  },
  ball: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: 'white',
    position: 'absolute',
  },
});

export default ControleParentalScreen;
