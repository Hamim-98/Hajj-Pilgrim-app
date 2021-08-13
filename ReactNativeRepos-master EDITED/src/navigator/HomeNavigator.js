import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  Dashboard,
  DashboardData,
  Audio
} from '../screens';

const HomeNavigator = createStackNavigator(
  {
    HomeScreen,
    Dashboard,
    DashboardData,
    Audio
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(HomeNavigator);
