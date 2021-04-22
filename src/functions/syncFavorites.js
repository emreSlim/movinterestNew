import AsyncStorage from '@react-native-async-storage/async-storage';

async function setAllFavorites(array) {
  try {
    await AsyncStorage.setItem('favorites', JSON.stringify(array));
  } catch (e) {
    console.log(e);
  }
}

async function getAllFavorites() {
  try {
    let previous = await AsyncStorage.getItem('favorites');
    previous = previous ? JSON.parse(previous) : [];
    return previous;
  } catch (e) {
    console.log(e);
  }
}

export {setAllFavorites, getAllFavorites};
