import React from 'react';
import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import CustomButton from './CustomButton';

export default function ListItem({
  text,
  onPress,
  buttonLabel = 'select',
  element,
  imageSource,
}) {
  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Image
        defaultSource={require('../images/default-image.jpg')}
        style={styles.image}
        source={
          typeof imageSource === 'number' ? imageSource : {uri: imageSource}
        }
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>{text} </Text>
        {element}
        <CustomButton
          title={buttonLabel}
          onPress={onPress}
          style={styles.buttonStyle}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    maxHeight: 300,
    flexDirection: 'row',
    elevation: 5,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    backgroundColor: '#ec4',
    top: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  subContainer: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'space-around',
    padding: 10,
  },
  image: {
    shadowColor: 'black',

    height: 300,
    width: 190,
  },
  text: {
    textAlign: 'center',
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    maxWidth: 160,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
  },
});
