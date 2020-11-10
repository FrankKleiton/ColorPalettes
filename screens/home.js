import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import PalettePreview from '../components/palette-preview';

const Home = ({navigation, route}) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const newColorPalette = route.params ? route.params.newColorPalette : undefined;

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

  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes([{
        paletteName: newColorPalette.name,
        colors: newColorPalette.colors
      }, ...colorPalettes]);
    }
  }, [newColorPalette]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handlePaletteFetching();
    setIsRefreshing(false);
  });

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
        keyExtractor={(item) => item.paletteName}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate('AddNewPalette')}>
            <Text style={styles.button}>Add a color scheme</Text>
          </TouchableOpacity>
        }
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
  button: {
    fontSize: 18,
    color: '#007676',
    fontWeight: 'bold',
    marginTop: 5,
  }
});

export default Home;
