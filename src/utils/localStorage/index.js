import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
  }
};
export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message); // error reading value
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('AsyncStorage Error: ' + error.message);
  }
  console.log('Data berhasil dihapus');
};
