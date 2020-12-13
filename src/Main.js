import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {ProductCard, SearchBar} from './components';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

const products = [
  {
    id: 0,
    title: 'Xiaomi Mi True Wireless Earbuds',
    imgURL:
      'https://m.media-amazon.com/images/I/51uguxa9nYL._AC._SR360,460.jpg',
    price: '₺134,77',
    inStock: true,
  },
  {
    id: 1,
    title: 'General Mobile GM 20',
    imgURL:
      'https://m.media-amazon.com/images/I/51lK00mvFaL._AC._SR180,230.jpg',
    price: '₺1.810,21',
    inStock: true,
  },
  {
    id: 2,
    title: 'Philips 58PUS8505/62 The One',
    imgURL:
      'https://m.media-amazon.com/images/I/71zLCzJcXaL._AC._SR360,460.jpg',
    price: '₺6.992,25',
    inStock: false,
  },
  {
    id: 3,
    title: 'LG 49UM7100PLB Ultra HD 4K',
    imgURL:
      'https://m.media-amazon.com/images/I/71gAldY8eGL._AC._SR360,460.jpg',
    price: '₺4.614,38',
    inStock: true,
  },
  {
    id: 4,
    title: 'Samsung Galaxy M31 SM-M315F',
    imgURL:
      'https://m.media-amazon.com/images/I/71mUIp9oCXL._AC._SR360,460.jpg',
    price: '₺2.995,80',
    inStock: true,
  },
  {
    id: 5,
    title: 'Apple AirPods Series 2',
    imgURL:
      'https://m.media-amazon.com/images/I/51XanmiXw0L._AC._SR360,460.jpg',
    price: '₺1.299,00',
    inStock: true,
  },
  {
    id: 6,
    title: 'Lenovo Tab M10 Plus',
    imgURL:
      'https://m.media-amazon.com/images/I/81JR-A35D0L._AC._SR360,460.jpg',
    price: '₺2.496,50',
    inStock: false,
  },
  {
    id: 7,
    title: 'Xiaomi Redmi 20000 Mah',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/41vVdTukkgL._AC_SX522_.jpg',
    price: '₺134,70',
    inStock: false,
  },
  {
    id: 8,
    title: 'Xiaomi Mijia Smart Home 360',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/31G-rIrW9zL._AC_UL320_SR226,320_.jpg',
    price: '₺269,73',
    inStock: true,
  },
  {
    id: 9,
    title: 'Xiaomi Mi Box S 4K Ultra HD',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/31sNKUGwNUL._AC_.jpg',
    price: '₺478,53',
    inStock: true,
  },
  {
    id: 10,
    title: 'Haylou Solar LS-5 Smartwatch',
    imgURL:
      'https://images-na.ssl-images-amazon.com/images/I/51kfZ4W9YSL._AC_SX522_.jpg',
    price: '₺296,00',
    inStock: true,
  },
];

function Main() {
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const renderProduct = ({item}) => (
    <ProductCard onCart={addToCart} product={item} />
  );

  const renderCartItems = ({item}) => (
    <View style={styles.modalItem}>
      <Image
        resizeMode="contain"
        source={{uri: item.imgURL}}
        style={styles.imageItemCart}
      />

      <View style={styles.modalItemInfo}>
        <Text style={styles.modalTitle}>{item.title}</Text>
        <Text style={styles.modalPrice}>{item.price}</Text>
      </View>
    </View>
  );

  function addToCart(item) {
    const index = cartList.findIndex((cartItem) => cartItem.id === item.id);
    if (index > -1) {
      Toast.show({
        type: 'error',
        topOffset: 70,
        text1: 'Cannot be added',
        text2: 'You already have this product in your cart',
      });
      return;
    }
    setCartList([...cartList, item]);
    Toast.show({
      topOffset: 70,
      text1: 'Product added',
      text2: 'Check your cart, and enjoy.',
    });
  }

  function searchProduct(text) {
    const filteredList = products.filter((product) => {
      const itemName = product.title.toUpperCase();
      const searchWord = text.toUpperCase();
      return itemName.indexOf(searchWord) > -1;
    });

    setProductList(filteredList);
  }

  useEffect(() => {
    setProductList(products);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={<SearchBar onSearch={searchProduct} />}
          ListEmptyComponent={
            <View style={styles.noFoundText}>
              <Text style={styles.noFoundText}>Try another keyword.</Text>
              <Text style={styles.noFoundText}>No product found.</Text>
            </View>
          }
          numColumns={2}
          keyExtractor={(item, index) => item.id.toString()}
          data={productList}
          renderItem={renderProduct}
        />
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => setModalVisible(!modalVisible)}>
          <Image
            style={styles.cartIcon}
            source={require('./assets/shopping-cart-452-1163339.webp')}
          />
        </TouchableOpacity>

        <View>
          <Modal
            onBackdropPress={() => setModalVisible(false)}
            isVisible={modalVisible}>
            <View style={styles.modalContainer}>
              <FlatList
                ListHeaderComponent={
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                      marginTop: 20,
                      marginBottom: 10,
                      color: 'orange',
                      textAlign: 'center',
                    }}>
                    Your Cart
                  </Text>
                }
                ListEmptyComponent={
                  <View style={styles.emptyGroup}>
                    <Image
                      resizeMode="contain"
                      style={styles.emptyCartIcon}
                      source={require('./assets/shopping-cart-452-1163339.webp')}
                    />
                    <Text style={styles.noFoundText}>No product found.</Text>
                  </View>
                }
                keyExtractor={(item, index) => item.id.toString()}
                data={cartList}
                renderItem={renderCartItems}
              />
            </View>
          </Modal>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
    marginHorizontal: 3,
  },
  noFoundText: {
    alignItems: 'center',
    color: 'gray',
    fontSize: 20,
    paddingTop: 10,
  },
  cartIcon: {
    width: 45,
    height: 45,
    tintColor: 'white',
  },
  cartIconContainer: {
    zIndex: 2,
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 11.14,
    elevation: 17,
  },
  modalContainer: {
    flex: 0.75,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  modalItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
  },
  modalItemInfo: {flex: 6},
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingVertical: 5,
    color: 'gray',
  },
  modalPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'green',
    paddingBottom: 10,
  },
  imageItemCart: {
    flex: 1,
    height: 50,
    marginRight: 10,
  },
  emptyCartIcon: {
    tintColor: 'lightgray',
    height: 100,
  },
  emptyGroup: {
    flex: 1,
    height: Dimensions.get('window').height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
