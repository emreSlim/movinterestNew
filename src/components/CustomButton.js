import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

export default function CustomButton({
  title = 'Button',
  onPress,
  color = '#4af',
  style,
  textStyle,
  iconSource,
}) {
  return (
    <TouchableNativeFeedback
      style={styles.touchable}
      onPress={onPress}
      activeOpacity={0.5}
      underlayColor="#000">
      <View style={{...styles.container, backgroundColor: color, ...style}}>
        {iconSource ? (
          <Image style={styles.icon} source={iconSource} fadeDuration={0} />
        ) : undefined}
        {title ? (
          <Text style={{...styles.text, ...textStyle}}>
            {title.toUpperCase()}
          </Text>
        ) : undefined}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 3,
  },
  container: {
    elevation: 5,
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row',
    width: 'auto',
    borderRadius: 3,
    justifyContent: 'center',
  },
  text: {
    padding: 6,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    tintColor: '#fffc',
    borderRadius: 3,
    margin: 5,
    width: 30,
    height: 30,
  },
});
