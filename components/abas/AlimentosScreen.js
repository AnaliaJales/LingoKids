import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import VoltarScreen from './VoltarScreen';
import * as Animatable from 'react-native-animatable';


const AlimentosScreen = ({ navigation }) => {
  const alimentos = [
    { id: 1, name: 'Abacate', image: require('../../assets/imagens/alimentos/abacate.png') },
    { id: 2, name: 'Abacaxi', image: require('../../assets/imagens/alimentos/abacaxi.png') },
    { id: 4, name: 'Banana', image: require('../../assets/imagens/alimentos/banana.png') },
    { id: 5, name: 'Batata', image: require('../../assets/imagens/alimentos/batata.png') },
    { id: 6, name: 'Brócolis', image: require('../../assets/imagens/alimentos/brocolis.png') },
    { id: 7, name: 'Cenoura', image: require('../../assets/imagens/alimentos/cenoura.png') },
    { id: 8, name: 'Coco', image: require('../../assets/imagens/alimentos/coco.png') },
    { id: 9, name: 'Laranja', image: require('../../assets/imagens/alimentos/laranja.png') },
    { id: 10, name: 'Leite', image: require('../../assets/imagens/alimentos/leite.png') },
    { id: 11, name: 'Limão', image: require('../../assets/imagens/alimentos/limao.png') },
    { id: 12, name: 'Maçã', image: require('../../assets/imagens/alimentos/maca.png') },
    { id: 13, name: 'Melancia', image: require('../../assets/imagens/alimentos/melancia.png') },
    { id: 14, name: 'Morango', image: require('../../assets/imagens/alimentos/morango.png') },
    { id: 15, name: 'Pão', image: require('../../assets/imagens/alimentos/pao.png') },
    { id: 16, name: 'Queijo', image: require('../../assets/imagens/alimentos/queijo.png') },
    { id: 17, name: 'Sanduíche', image: require('../../assets/imagens/alimentos/sanduiche.png') },
    { id: 18, name: 'Sorvete', image: require('../../assets/imagens/alimentos/sorvete.png') },
    { id: 19, name: 'Uva', image: require('../../assets/imagens/alimentos/uva.png') },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const alimentosPorPagina = 6;
  const totalPages = Math.ceil(alimentos.length / alimentosPorPagina);

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

  const startIndex = (currentPage - 1) * alimentosPorPagina;
  const endIndex = Math.min(startIndex + alimentosPorPagina, alimentos.length);
  const alimentosPaginados = alimentos.slice(startIndex, endIndex);

  return (
    <LinearGradient 
      colors={['#E9971D', '#F6F89A', '#E9971D']} 
      style={styles.container}>
      <VoltarScreen />
      <ScrollView>
        <View style={styles.alimentosContainer}>
          {alimentosPaginados.map((alimento) => (
            <Animatable.View 
              key={alimento.id}
              animation="rubberBand"
              direction="normal"
              easing="ease-out"
              duration={2500}
              useNativeDriver
              style={styles.alimentoButtonAnimacao}>
              <TouchableOpacity
                style={styles.alimentoButton}
                onPress={() => alimentoPress(alimento.id)}>
                <View style={styles.cardContainer}>
                  <Image
                    style={styles.cardImage}
                    source={require('../../assets/imagens/cardPrincipal.png')}
                  />
                  <Image
                    style={styles.alimentoIcon}
                    source={alimento.image}
                  />
                  <Text style={styles.alimentoName}>{alimento.name}</Text>
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
  alimentosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 125,
  },
  alimentoButton: {
    alignItems: 'center',
  },
  alimentoButtonAnimacao: {
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
  alimentoIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'center',
    top: 60,
  },
  alimentoName: {
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

export default AlimentosScreen;
