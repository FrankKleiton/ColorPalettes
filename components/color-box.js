import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ColorBox = ({colorName, hexCode}) => {
  const backgroundColor = {
    backgroundColor: hexCode,
  };

  const color = {
    color: parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1 ? 'black' : 'white',
  };

  return (
    <View style={[styles.box, backgroundColor]}>
      <Text style={[styles.boxText, color]}>
        {colorName}: {hexCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
  boxText: {
    fontWeight: 'bold',
  },
});

export default ColorBox;
