/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {globalstyles} from '../globalstyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getTrendingMovies,
  getImageURL,
  getTrendingMoviesWeek,
} from '../functions/APIfunctions';

export default function Trendings({navigation}) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingOnWeek, setTrendingOnWeek] = useState([]);

  function handleClick(movieId) {
    navigation.navigate('movie-details', {movieId: movieId});
  }
  useEffect(() => {
    getTrendingMovies().then(data => setTrendingMovies(data.results));
    getTrendingMoviesWeek().then(data => setTrendingOnWeek(data.results));
  }, []);

  return (
    <View style={globalstyles.tabBg}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Trendings</Text>
        <Icon name="fire" color="#ec4" size={30} />
      </View>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flex: 1,

          justifyContent: 'space-around',
        }}>
        <View>
          <Text style={styles.heading}>Today</Text>
          <View style={styles.listContainer}>
            {trendingMovies.length ? (
              <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                horizontal={true}
                keyExtractor={(item, index) => index}
                data={trendingMovies}
                renderItem={({item, index}) => {
                  if (!item.title) {
                    return;
                  }
                  return (
                    <Pressable
                      onPress={() => {
                        handleClick(item.id);
                      }}
                      style={{flexDirection: 'column'}}>
                      <View style={styles.itemContainer}>
                        <Image
                          resizeMode="contain"
                          style={styles.image}
                          source={
                            item.poster_path
                              ? {uri: getImageURL(item.poster_path)}
                              : require('../images/default-image.jpg')
                          }
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.title}>
                        {item.title}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: '#151515',
                }}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{...globalstyles.placeholder, flex: 0}}>
                  Loading..
                </Text>
              </View>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.heading}>This Week</Text>
          <View style={styles.listContainer}>
            {trendingOnWeek.length ? (
              <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                horizontal={true}
                keyExtractor={(item, index) => index}
                data={trendingOnWeek}
                renderItem={({item, index}) => {
                  if (!item.title) {
                    return;
                  }
                  return (
                    <Pressable
                      style={{flexDirection: 'column'}}
                      onPress={() => {
                        handleClick(item.id);
                      }}>
                      <View style={styles.itemContainer}>
                        <Image
                          resizeMode="contain"
                          style={styles.image}
                          source={
                            item.poster_path
                              ? {uri: getImageURL(item.poster_path)}
                              : require('../images/default-image.jpg')
                          }
                        />
                      </View>
                      <Text numberOfLines={1} style={styles.title}>
                        {item.title}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  flex: 1,

                  justifyContent: 'center',
                  backgroundColor: '#151515',
                }}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{...globalstyles.placeholder, flex: 0}}>
                  Loading..
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    marginHorizontal: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    elevation: 5,
  },
  listContainer: {},
  itemContainer: {
    alignItems: 'center',
    backgroundColor: '#000',
    marginHorizontal: 6,
    borderRadius: 8,
    height: 180,
  },
  image: {
    height: 180,
    borderRadius: 8,
    width: '100%',
    minWidth: 120,
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
    color: '#fff',
    paddingBottom: 0,
  },
  heading: {
    marginTop: 10,
    color: '#fff',
    fontSize: 40,
  },
  contentContainerStyle: {
    paddingHorizontal: 6,
    flexGrow: 0,
    paddingVertical: 6,
    marginVertical: 10,
    backgroundColor: '#353535',
  },
});
