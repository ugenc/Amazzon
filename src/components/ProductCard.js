import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const ProductCard = ({product, onCart}) => {
  return (
    <View style={styles.container}>
      <View>
        {!product.inStock ? (
          <Text style={styles.stock}>OUT OF STOCK</Text>
        ) : (
          <Text style={styles.stock}></Text>
        )}
        <Image
          resizeMode="contain"
          source={{uri: product.imgURL}}
          style={styles.image}
        />
        <Text style={styles.title}>{product.title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.price}>{product.price}</Text>
        </View>

        {!product.inStock ? (
          <Image
            style={styles.cartButtonOutOfStock}
            source={require('../assets/shopping-cart-452-1163339.webp')}
          />
        ) : (
          <TouchableOpacity onPress={() => onCart(product)}>
            <Image
              style={styles.cartButton}
              source={require('../assets/shopping-cart-452-1163339.webp')}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    margin: 5,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 11.14,
    elevation: 17,
    justifyContent: 'space-between',
  },
  image: {
    height: Dimensions.get('window').height / 6,
  },
  title: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  stock: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  cartButton: {
    width: 30,
    height: 30,
    tintColor: 'orange',
  },
  cartButtonOutOfStock: {
    width: 30,
    height: 30,
    tintColor: 'lightgray',
  },
});

export {ProductCard};
