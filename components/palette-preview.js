import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';

const PalettePreview = ({handlePress, palette}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>{palette.paletteName}</Text>
      <FlatList
        style={styles.list}
        data={palette.colors.slice(0, 5)}
        keyExtractor={(item) => item.hexCode}
        renderItem={({item}) => (
          <View style={[{backgroundColor: item.hexCode}, styles.box]} />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  box: {
    height: 30,
    width: 30,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 5,
  },
  list: {
    marginBottom: 20,
    flexDirection: 'row',
  },
});

export default PalettePreview;
