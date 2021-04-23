/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Search from './screens/Search';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Trendings from './screens/Trendings';
import FavoritesScreen from './screens/FavoritesScreen';
const Tab = createMaterialBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      activeColor="#fff"
      inactiveColor="#ccc"
      shifting
      barStyle={{
        backgroundColor: '#000',
        borderLeftWidth: 0.5,
        borderColor: 'grey',
      }}>
      <Tab.Screen
        name="home-tab"
        options={{
          tabBarLabel: 'Trendings',
          tabBarIcon: ({color}) => (
            <Icon name="hotjar" color={color} size={24} />
          ),
        }}
        component={Trendings}
      />
      <Tab.Screen
        name="search-tab"
        options={{
          tabBarLabel: 'Search',

          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={24} />
          ),
        }}
        component={Search}
      />
      <Tab.Screen
        name="favorites-tab"
        options={{
          tabBarLabel: 'Favorites',

          tabBarIcon: ({color}) => <Icon name="star" color={color} size={24} />,
        }}
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );
}

export default TabRoutes;
