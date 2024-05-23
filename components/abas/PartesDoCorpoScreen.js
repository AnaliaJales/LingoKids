import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import VoltarScreen from './VoltarScreen';
import * as Animatable from 'react-native-animatable';


const PartesDoCorpoScreen = ({ navigation }) => {
  const partesDoCorpo = [
    { id: 1, name: 'Barriga', image: require('../../assets/imagens/partes_do_corpo/barriga.png') },
    { id: 2, name: 'Boca', image: require('../../assets/imagens/partes_do_corpo/boca.png') },
    { id: 3, name: 'Cabeça', image: require('../../assets/imagens/partes_do_corpo/cabeca.png') },
    { id: 4, name: 'Cabelo', image: require('../../assets/imagens/partes_do_corpo/cabelo.png') },
    { id: 5, name: 'Mão', image: require('../../assets/imagens/partes_do_corpo/mao.png') },
    { id: 6, name: 'Menina', image: require('../../assets/imagens/partes_do_corpo/menina.png') },
    { id: 7, name: 'Menino', image: require('../../assets/imagens/partes_do_corpo/menino.png') },
    { id: 8, name: 'Nariz', image: require('../../assets/imagens/partes_do_corpo/nariz.png') },
    { id: 9, name: 'Olhos', image: require('../../assets/imagens/partes_do_corpo/olhos.png') },
    { id: 10, name: 'Orelha', image: require('../../assets/imagens/partes_do_corpo/orelha.png') },
    { id: 11, name: 'Pé', image: require('../../assets/imagens/partes_do_corpo/pe.png') },
    { id: 12, name: 'Perna', image: require('../../assets/imagens/partes_do_corpo/perna.png') },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const partesPorPagina = 6;
  const totalPages = Math.ceil(partesDoCorpo.length / partesPorPagina);

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

  const startIndex = (currentPage - 1) * partesPorPagina;
  const endIndex = Math.min(startIndex + partesPorPagina, partesDoCorpo.length);
  const partesPaginadas = partesDoCorpo.slice(startIndex, endIndex);

  return (
    <LinearGradient 
      colors={['#E9971D', '#F6F89A', '#E9971D']} 
      style={styles.container}>
      <VoltarScreen />
      <ScrollView>
        <View style={styles.partesContainer}>
          {partesPaginadas.map((parte) => (
            <Animatable.View 
              key={parte.id}
              animation="rubberBand"
              direction="normal"
              easing="ease-out"
              duration={2500}
              useNativeDriver
              style={styles.parteButtonAnimacao}>
              <TouchableOpacity
                style={styles.parteButton}
                onPress={() => partePress(parte.id)}>
                <View style={styles.cardContainer}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/imagens/cardPrincipal.png')}
                  />
                  <Image
                    style={styles.parteIcon}
                    source={parte.image}
                  />
                  <Text style={styles.parteName}>{parte.name}</Text>
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
  partesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 125,
  },
  parteButton: {
    alignItems: 'center',
  },
  parteButtonAnimacao: {
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
  parteIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'center',
    top: 60,
  },
  parteName: {
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

export default PartesDoCorpoScreen;
