import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
function SearchBar(props) {
  return (
    <View>
      <TextInput
        style={styles.bar}
        placeholder="Search a product"
        onChangeText={props.onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: 'darkgray',
    borderWidth: 2,
    borderRadius: 10,
    color: 'gray',
    fontSize: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 11.14,
    elevation: 17,
  },
});

export {SearchBar};
