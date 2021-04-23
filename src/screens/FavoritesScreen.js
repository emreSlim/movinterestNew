/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {globalstyles} from '../globalstyles';
import {getAllFavorites} from '../functions/syncFavorites';
import Icon from 'react-native-vector-icons/FontAwesome';
import FavListItem from '../components/FavoriteListItem';
import {connect} from 'react-redux';

function FavoritesScreen({navigation, favorites, syncFavoritesList}) {
  useEffect(() => {
    getAllFavorites().then(syncFavoritesList).catch(console.log);
  }, []);

  return (
    <View style={globalstyles.tabBg}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>My Favorites</Text>
        <Icon name="star" color="#ec4" size={30} />
      </View>
      <FlatList
        keyExtractor={(item, index) => index}
        data={favorites}
        renderItem={({item, index}) => (
          <FavListItem navigation={navigation} movieId={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    elevation: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    marginHorizontal: 20,
  },
});

function mapDispatchToProps(disptach) {
  return {
    syncFavoritesList: payload =>
      disptach({
        type: 'SYNC_FAVORITES_FROM_LOCALSTORAGE',
        payload: payload,
      }),
  };
}

function mapStateToProps(state) {
  return {
    favorites: state,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
