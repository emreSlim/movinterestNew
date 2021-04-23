/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {searchMovies, getImageURL} from '../functions/APIfunctions';
import ListItem from '../components/ListItem';
import {globalstyles} from '../globalstyles';

export default function SearchTab({navigation}) {
  const [searchedMovieList, setSearchedMoviList] = useState();
  const [timerID, setTimerID] = useState();
  const [placeholderText, setPlaceHolderText] = useState('Perform a search!');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  function clearInput() {
    inputRef.current.clear();
    inputRef.current.blur();
    setSearchedMoviList();
    setPlaceHolderText('Perform a search!');
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => {
      setPlaceHolderText('Perform a search!');
    });
  }, []);

  function handleChange(text) {
    setLoading(true);
    setPlaceHolderText('Searching..');
    clearTimeout(timerID);

    setTimerID(
      setTimeout(() => {
        searchMovies(text)
          .then(data => {
            if (data?.results?.length > 0) {
              setSearchedMoviList(data?.results);
              setPlaceHolderText('Perform a search!');
            } else {
              setSearchedMoviList();
              setPlaceHolderText('No Results Found');
            }
            setLoading(false);
          })
          .catch(console.log);
      }, 500),
    );
    text === '' && setPlaceHolderText('Perform a search!');
  }

  function handleClick(movieId) {
    navigation.navigate('movie-details', {movieId: movieId});
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        inputRef.current.blur();
      }}>
      <View style={globalstyles.tabBg}>
        <View style={styles.upperSubContainer}>
          <View style={styles.inputBoxContainer}>
            <Icon onPress={handleChange} name="search" color="#888" size={25} />
            <TextInput
              placeholderTextColor="#666"
              onBlur={() => setPlaceHolderText('Perform a search!')}
              ref={inputRef}
              onChangeText={handleChange}
              style={styles.inputBox}
              placeholder="Search Movies"
            />
            <Icon onPress={clearInput} name="close" color="#888" size={25} />
          </View>
        </View>
        {searchedMovieList ? (
          <FlatList
            keyExtractor={(item, index) => index}
            data={searchedMovieList}
            renderItem={({item, index}) => {
              const imageSource = item.poster_path
                ? getImageURL(item.poster_path)
                : require('../images/dummy-posterr.jpg');
              return (
                <ListItem
                  onPress={() => {
                    handleClick(item.id);
                  }}
                  text={item.title}
                  buttonLabel="details"
                  element={
                    <View>
                      <Text style={styles.itemElementText}>
                        Release Date:{' '}
                        {new Date(item.release_date).toLocaleDateString()}
                      </Text>
                      <Text style={styles.itemElementText}>
                        User Ratings: {item.vote_average}
                      </Text>
                    </View>
                  }
                  imageSource={imageSource}
                />
              );
            }}
          />
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator animating={loading} color="#fff" size="large" />
            <Text style={{...globalstyles.placeholder, flex: 0}}>
              {placeholderText}
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  upperSubContainer: {
    backgroundColor: '#252525',
    elevation: 10,
  },
  inputBoxContainer: {
    elevation: 5,
    alignSelf: 'center',
    backgroundColor: '#000',
    margin: 10,
    flexDirection: 'row',
    borderColor: 'grey',
    borderRadius: 8,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputBox: {
    flexGrow: 1,
    color: '#fff',
    height: 50,
    fontSize: 18,
    padding: 10,
  },
  itemElementText: {
    color: '#000',
    fontSize: 16,
  },
});
