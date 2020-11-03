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
  },
  boxText: {
    fontWeight: 'bold',
  },
});

export default ColorBox;
