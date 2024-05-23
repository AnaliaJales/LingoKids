import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import VoltarScreen from './VoltarScreen';
import * as Animatable from 'react-native-animatable';


const LetrasScreen = ({ navigation }) => {
  const letras = [
    { id: 1, name: 'A', image: require('../../assets/imagens/letras/A.png') },
    { id: 2, name: 'B', image: require('../../assets/imagens/letras/B.png') },
    { id: 3, name: 'C', image: require('../../assets/imagens/letras/C.png') },
    { id: 4, name: 'D', image: require('../../assets/imagens/letras/D.png') },
    { id: 5, name: 'E', image: require('../../assets/imagens/letras/E.png') },
    { id: 6, name: 'F', image: require('../../assets/imagens/letras/F.png') },
    { id: 7, name: 'G', image: require('../../assets/imagens/letras/G.png') },
    { id: 8, name: 'H', image: require('../../assets/imagens/letras/H.png') },
    { id: 9, name: 'I', image: require('../../assets/imagens/letras/I.png') },
    { id: 10, name: 'J', image: require('../../assets/imagens/letras/J.png') },
    { id: 11, name: 'K', image: require('../../assets/imagens/letras/K.png') },
    { id: 12, name: 'L', image: require('../../assets/imagens/letras/L.png') },
    { id: 13, name: 'M', image: require('../../assets/imagens/letras/M.png') },
    { id: 14, name: 'N', image: require('../../assets/imagens/letras/N.png') },
    { id: 15, name: 'O', image: require('../../assets/imagens/letras/O.png') },
    { id: 16, name: 'P', image: require('../../assets/imagens/letras/P.png') },
    { id: 17, name: 'Q', image: require('../../assets/imagens/letras/Q.png') },
    { id: 18, name: 'R', image: require('../../assets/imagens/letras/R.png') },
    { id: 19, name: 'S', image: require('../../assets/imagens/letras/S.png') },
    { id: 20, name: 'T', image: require('../../assets/imagens/letras/T.png') },
    { id: 21, name: 'U', image: require('../../assets/imagens/letras/U.png') },
    { id: 22, name: 'V', image: require('../../assets/imagens/letras/V.png') },
    { id: 23, name: 'W', image: require('../../assets/imagens/letras/W.png') },
    { id: 24, name: 'X', image: require('../../assets/imagens/letras/X.png') },
    { id: 25, name: 'Y', image: require('../../assets/imagens/letras/Y.png') },
    { id: 26, name: 'Z', image: require('../../assets/imagens/letras/Z.png') },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const letrasPorPagina = 6;
  const totalPages = Math.ceil(letras.length / letrasPorPagina);

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

  const startIndex = (currentPage - 1) * letrasPorPagina;
  const endIndex = Math.min(startIndex + letrasPorPagina, letras.length);
  const letrasPaginadas = letras.slice(startIndex, endIndex);

  return (
    <LinearGradient 
      colors={['#E9971D', '#F6F89A', '#E9971D']} 
      style={styles.container}>
      <VoltarScreen />
      <ScrollView>
        <View style={styles.letrasContainer}>
          {letrasPaginadas.map((letra) => (
            <Animatable.View 
              key={letra.id}
              animation="rubberBand"
              direction="normal"
              easing="ease-out"
              duration={2500}
              useNativeDriver
              style={styles.letraButtonAnimacao}>
              <TouchableOpacity
                style={styles.letraButton}
                onPress={() => letraPress(letra.id)}>
                <View style={styles.cardContainer}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/imagens/cardPrincipal.png')}
                  />
                  <Image
                    style={styles.letraIcon}
                    source={letra.image}
                  />
                  <Text style={styles.letraName}>{letra.name}</Text>
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
  letrasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 125,
  },
  letraButton: {
    alignItems: 'center',
  },
  letraButtonAnimacao: {
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
  letraIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'center',
    top: 60,
  },
  letraName: {
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

export default LetrasScreen;
