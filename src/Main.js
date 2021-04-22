import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MovieDetails from './screens/MovieDetails';
import TabRoutes from './TabRoutes';
import {NavigationContainer} from '@react-navigation/native';
import {Animated} from 'react-native';

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: forSlide,
          gestureEnabled: true,

          gestureDirection: 'horizontal',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#333',
          },
        }}>
        <Stack.Screen
          name="tab-routes"
          component={TabRoutes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie-details"
          component={MovieDetails}
          options={{
            title: 'Movie Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const forSlide = ({current, next, inverted, layouts: {screen}}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};
