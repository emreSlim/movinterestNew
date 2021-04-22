/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {getImageURL, getMovieDetails} from '../functions/APIfunctions';

export default function FavListItem({movieId, navigation}) {
  const [title, setTitle] = useState();
  const [imageSRC, setImageSRC] = useState();
  const [secondaryImageSrc, setSecondaryImageSrc] = useState();
  const [tagLine, setTagLine] = useState();
  useEffect(() => {
    getMovieDetails(movieId)
      // eslint-disable-next-line no-shadow
      .then(({title, poster_path, backdrop_path, tagline}) => {
        setTitle(title);
        poster_path && setImageSRC(getImageURL(poster_path));
        backdrop_path && setSecondaryImageSrc(getImageURL(backdrop_path));
        setTagLine(tagline);
      })
      .catch(console.log);
  }, [movieId]);

  function handleClick() {
    navigation.navigate('movie-details', {movieId: movieId});
  }

  return (
    <>
      {title ? (
        <Pressable onPress={handleClick} style={styles.itemContainer}>
          <Image
            style={{
              ...styles.image,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            source={
              imageSRC
                ? {
                    uri: imageSRC,
                  }
                : require('../images/dummy-posterr.jpg')
            }
          />
          <View style={{flex: 1, paddingHorizontal: 10, paddingBottom: 5}}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={{color: '#fff'}}>{tagLine}</Text>
          </View>
          <Image
            style={{
              ...styles.image,
              borderBottomLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={
              secondaryImageSrc
                ? {
                    uri: secondaryImageSrc,
                  }
                : require('../images/dummy-posterr.jpg')
            }
          />
        </Pressable>
      ) : (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#444',
    minHeight: 100,
    margin: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
    textAlignVertical: 'center',
  },
  image: {
    width: 100,
    height: 150,
  },
  spinner: {
    flex: 1,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: '#151515',
  },
});
