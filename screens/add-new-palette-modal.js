import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Switch,
} from 'react-native';
import {colors} from '../data';

const AddNewPaletteModal = ({navigation}) => {
  const [paletteName, setPaletteName] = useState('');
  const [palette, setPalette] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const firstColor = colors[0].colorName;

  const handleSwitch = useCallback((value, color) => {
    if (value) {
      setPalette((current) => [...current, color]);
    } else {
      setPalette(
        palette.filter(
          (paletteColor) => paletteColor.colorName !== color.colorName,
        ),
      );
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!paletteName) {
      Alert.alert('Please enter a palette name.');
    } else if (palette.length < 3) {
      Alert.alert('Please, choose at least 3 colors.');
    } else {
      navigation.navigate('Home', {
        newColorPalette: {
          name: paletteName,
          colors: palette,
        },
      });
    }
  }, [paletteName, palette]);

  return (
    <View style={styles.container}>
      <View style={styles.addPaletteContainer}>
        <Text style={styles.marginBottom}>Name of your color palette</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPaletteName(text)}
          value={paletteName}
        />
      </View>

      <FlatList
        style={styles.list}
        data={colors}
        renderItem={({item}) => (
          <View
            style={[
              styles.box,
              item.colorName !== firstColor ? styles.borderTop : {},
            ]}>
            <Text>{item.colorName}</Text>
            <Switch
              trackColor={{false: 'gray', true: '#66E8E8'}}
              thumbColor={isSwitchOn ? '#007676' : 'white'}
              onValueChange={(value) => handleSwitch(value, item)}
              value={
                !!palette.find((color) => color.colorName === item.colorName)
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.colorName}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    height: '100%',
  },
  addPaletteContainer: {
    backgroundColor: 'white',
    height: 90,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    borderRadius: 5,
  },
  marginBottom: {
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#007676',
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    maxHeight: '70%',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
});

export default AddNewPaletteModal;
