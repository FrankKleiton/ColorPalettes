import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import PalettePreview from '../components/palette-preview';

const Home = ({navigation}) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
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
