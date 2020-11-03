import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ColorBox from '../components/color-box';

const ColorPalette = ({route}) => {
  const {colors, paletteName} = route.params;
  return (
    <View style={styles.container}>
      <FlatList
        data={colors}
        renderItem={({item}) => (
          <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
        )}
        keyExtractor={(item) => item.colorName}
        ListHeaderComponent={<Text style={styles.title}>{paletteName}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ColorPalette;
