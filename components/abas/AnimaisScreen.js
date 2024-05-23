import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import VoltarScreen from './VoltarScreen';
import * as Animatable from 'react-native-animatable';


const AnimaisScreen = ({ navigation }) => {
  const animais = [
    { id: 1, name: 'Cachorro', image: require('../../assets/imagens/animais/cachorro.png') },
    { id: 2, name: 'Gato', image: require('../../assets/imagens/animais/gato.png') },
    { id: 3, name: 'Porco', image: require('../../assets/imagens/animais/porco.png') },
    { id: 4, name: 'Elefante', image: require('../../assets/imagens/animais/elefante.png') },
    { id: 5, name: 'Macaco', image: require('../../assets/imagens/animais/macaco.png') },
    { id: 6, name: 'Pássaro', image: require('../../assets/imagens/animais/passaro.png') },
    { id: 7, name: 'Abelha', image: require('../../assets/imagens/animais/abelha.png') },
    { id: 8, name: 'Leão', image: require('../../assets/imagens/animais/leao.png') },
    { id: 9, name: 'Cavalo', image: require('../../assets/imagens/animais/cavalo.png') },
    { id: 10, name: 'Vaca', image: require('../../assets/imagens/animais/vaca.png') },
    { id: 11, name: 'Golfinho', image: require('../../assets/imagens/animais/golfinho.png') },
    { id: 12, name: 'Borboleta', image: require('../../assets/imagens/animais/borboleta.png') },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const animaisPorPagina = 6;
  const totalPages = Math.ceil(animais.length / animaisPorPagina);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * animaisPorPagina;
  const endIndex = Math.min(startIndex + animaisPorPagina, animais.length);
  const animaisPaginados = animais.slice(startIndex, endIndex);

  return (
    <LinearGradient 
      colors={['#E9971D', '#F6F89A', '#E9971D']} 
      style={styles.container}>
      <VoltarScreen />
      <ScrollView>
        <View style={styles.animaisContainer}>
          {animaisPaginados.map((animal) => (
            <Animatable.View 
              key={animal.id}
              animation="rubberBand"
              direction="normal"
              easing="ease-out"
              duration={2500}
              useNativeDriver
              style={styles.animalButtonAnimacao}>
              <TouchableOpacity
                style={styles.animalButton}
                onPress={() => animalPress(animal.id)}>
                <View style={styles.cardContainer}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/imagens/cardPrincipal.png')}
                  />
                  <Image
                    style={styles.animalIcon}
                    source={animal.image}
                  />
                  <Text style={styles.animalName}>{animal.name}</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePrevPage}>
          <Image source={require('../../assets/imagens/setaesquerda.png')} style={styles.paginationImage} />
        </TouchableOpacity>
        <Text style={styles.paginationText}>{currentPage}/{totalPages}</Text>
        <TouchableOpacity onPress={handleNextPage}>
          <Image source={require('../../assets/imagens/setadireita.png')} style={styles.paginationImage} />
        </TouchableOpacity>
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
  animaisContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 125,
  },
  animalButton: {
    alignItems: 'center',
  },
  animalButtonAnimacao: {
    alignItems: 'center',
    marginBottom: 15,
  },
  cardContainer: {
    width: 160,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
  },
  animalIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'center',
    top: 60,
  },
  animalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 110,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 10,
  },
});

export default AnimaisScreen;
