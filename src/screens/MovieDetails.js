/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Linking,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getImageURL, getMovieDetails} from '../functions/APIfunctions';
import {globalstyles} from '../globalstyles';

import {connect} from 'react-redux';

function MovieDetails({
  route,
  favorites,
  addItemToFavorites,
  removeItemFromFavorites,
}) {
  const {movieId} = route.params || 550;
  const [favorite, setFavorite] = useState(false);
  const [movie, setMovie] = useState();
  const [starColor, setStarColor] = useState('#666');
  const [loading, setLoading] = useState(true);

  function onStarPress() {
    if (!favorite) {
      setFavorite(true);
      addItemToFavorites(movieId);
    } else {
      setFavorite(false);

      removeItemFromFavorites(movieId);
    }
  }

  useEffect(() => {
    setStarColor(favorite ? '#ec4' : '#666');
  }, [favorite]);

  useEffect(() => {
    if (favorites.includes(movieId)) {
      setFavorite(true);
    }

    getMovieDetails(movieId)
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(console.log);
  }, [movieId, favorites]);

  return !movie ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#151515',
      }}>
      <ActivityIndicator size="large" animating={loading} color="#fff" />
      <Text style={{...globalstyles.placeholder, flex: 0}}>Loading..</Text>
    </View>
  ) : (
    <ScrollView style={globalstyles.stackBg}>
      <Image
        style={styles.poster}
        source={
          movie?.backdrop_path
            ? {
                uri: getImageURL(movie?.backdrop_path),
              }
            : require('../images/dummy-posterr.jpg')
        }
      />
      <View style={styles.details}>
        <Text style={styles.title}>{movie?.title}</Text>
        {movie.tagline ? (
          <Text style={styles.overviewText}>-- {movie.tagline}</Text>
        ) : null}
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.mediumText}>
            {new Date(movie?.release_date).getFullYear()}
          </Text>
          {movie.runtime ? (
            <Text style={styles.mediumText}>{movie.runtime} mins</Text>
          ) : null}
        </View>
        {movie.vote_average ? (
          <Text style={styles.mediumText}>
            User Ratings: {movie.vote_average}
            {'  '} ({movie.vote_count} votes)
          </Text>
        ) : null}
        {movie.status ? (
          <Text style={styles.mediumText}>Status: {movie.status}</Text>
        ) : null}
        <Text style={styles.mediumText}>
          {movie.spoken_languages
            ?.map(item => item.name)
            .join(', ')
            .toUpperCase()}
        </Text>
        {movie.genres?.length > 0 && (
          <Text style={styles.mediumText}>
            [ {movie?.genres.map(item => item.name).join(', ')} ]
          </Text>
        )}
      </View>
      <View style={styles.fevoriteContainer}>
        <Text style={styles.favoriteText}>
          {favorite ? 'Your Favorites' : 'Add to Favorites'}
        </Text>
        <Icon
          onPress={onStarPress}
          style={{paddingHorizontal: 10}}
          name="star"
          color={starColor}
          size={40}
        />
        <Text style={{color: '#555', width: 70}}>Press to Toggle</Text>
      </View>
      <View style={styles.overview}>
        <View style={{justifyContent: 'center'}}>
          <Image
            style={styles.secondaryPoster}
            source={
              movie?.backdrop_path
                ? {
                    uri: getImageURL(movie?.poster_path),
                  }
                : require('../images/dummy-posterr.jpg')
            }
          />
        </View>
        <Text style={styles.overviewText}>
          {'  '}
          {movie?.overview}
        </Text>
      </View>
      <View style={styles.otherDetails}>
        {movie.budget ? (
          <Text style={globalstyles.textMuted}>
            Budget: USD {movie.budget / 1000000} Million
          </Text>
        ) : null}
        {movie.revenue ? (
          <Text style={globalstyles.textMuted}>
            Revenue: USD {(movie.revenue / 1000000).toFixed(3)} Million
          </Text>
        ) : null}
        <Text style={globalstyles.textMuted}>
          Release Date: {movie.release_date}
        </Text>

        {movie.homepage ? (
          <Text
            style={globalstyles.textMuted}
            onPress={() => {
              Alert.alert('Sure?', 'This link will open on your web browser.', [
                {
                  text: 'Cancel',
                  style: 'destructive',
                },
                {text: 'OK', onPress: () => Linking.openURL(movie.homepage)},
              ]);
            }}>
            Homepage: {movie.homepage}
          </Text>
        ) : null}
      </View>
      <View style={styles.companyListContainer}>
        {movie?.production_companies?.length > 0 && (
          <>
            <Text style={{color: '#fff', fontSize: 20}}>
              Production Companies
            </Text>
            <FlatList
              contentContainerStyle={{
                paddingVertical: 6,
                marginVertical: 10,
                backgroundColor: '#353535',
              }}
              horizontal={true}
              keyExtractor={(item, index) => index}
              data={movie.production_companies}
              ItemSeparatorComponent={function Seperator() {
                return (
                  <View
                    style={{
                      width: 2,
                      backgroundColor: '#000',
                      borderRadius: 100,
                    }}
                  />
                );
              }}
              renderItem={({item, index}) => {
                return (
                  <View style={{flexDirection: 'column'}}>
                    <View style={styles.itemContainer}>
                      <Image
                        resizeMode={item.logo_path ? 'contain' : 'cover'}
                        style={styles.companyLogo}
                        source={
                          item.logo_path
                            ? {uri: getImageURL(item.logo_path, 200)}
                            : require('../images/dummy-posterr.jpg')
                        }
                      />
                    </View>
                    <Text numberOfLines={1} style={styles.companyLabel}>
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  poster: {height: 250, maxWidth: '100%'},
  details: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  mediumText: {
    color: '#888',
    paddingRight: 10,
    fontSize: 18,
  },
  overview: {
    flexDirection: 'row',
    maxWidth: width,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    padding: 10,
  },
  overviewText: {
    paddingLeft: 10,
    fontSize: 16,
    flex: 1,
    color: '#bbb',
  },
  secondaryPoster: {
    width: 150,
    height: 225,
  },
  otherDetails: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
  },
  companyListContainer: {
    padding: 10,
  },
  itemContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
    borderRadius: 5,
  },
  companyLogo: {
    borderRadius: 5,
    height: 150,
    width: '100%',
    minWidth: 150,
  },
  companyLabel: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 5,
    paddingBottom: 0,
  },
  fevoriteContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
  },
  favoriteText: {
    color: '#eee',
    fontSize: 30,
  },
});

function mapDisPatchToProps(dispatch) {
  return {
    addItemToFavorites: payload => {
      dispatch({
        type: 'ADD_ITEM_TO_FAVORITES',
        payload: payload,
      });
    },
    removeItemFromFavorites: payload => {
      dispatch({
        type: 'REMOVE_ITEM_FROM_FAVORITES',
        payload: payload,
      });
    },
  };
}

function mapStateToProps(state) {
  return {
    favorites: state,
  };
}

export default connect(mapStateToProps, mapDisPatchToProps)(MovieDetails);
