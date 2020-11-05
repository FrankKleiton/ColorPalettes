import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import PalettePreview from '../components/palette-preview';

const Home = ({navigation}) => {
  const [colorPalettes, setColorPalettes] = useState([]);

  const handlePaletteFetching = useCallback(async () => {
    const response = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );

    if (response.ok) {
      const palettes = await response.json();
      setColorPalettes(palettes);
    }
  }, []);

  useEffect(() => {
    handlePaletteFetching();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={colorPalettes}
        renderItem={({item}) => (
          <PalettePreview
            palette={item}
            handlePress={() => {
              navigation.navigate('ColorPalette', item);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
});

export default Home;
