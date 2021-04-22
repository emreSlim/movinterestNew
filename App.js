/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {AppState, StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {setAllFavorites} from './src/functions/syncFavorites';
import Main from './src/Main';

export default function App() {
  useEffect(() => {
    AppState.addEventListener('blur', saveDataToLocalStorage);
    return () => {
      AppState.removeEventListener('blur', saveDataToLocalStorage);
    };
  }, []);

  function saveDataToLocalStorage() {
    setAllFavorites(store.getState());
  }

  return (
    <Provider store={store}>
      <View style={{backgroundColor: '#151515', flex: 1}}>
        <StatusBar backgroundColor="#151515" />
        <Main />
      </View>
    </Provider>
  );
}
