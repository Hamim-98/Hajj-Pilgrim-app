import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { SafeAreaView } from 'react-navigation'
import { Text, StyleSheet } from 'react-native'
import Map from '../components/Map'
import BackButton from '../components/BackButton';

const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Map />
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
   </SafeAreaView>
  )
}

export default memo(Dashboard);
