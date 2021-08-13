import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Location = () => (
  <Image source={require('../assets/Location.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
});

export default memo(Location);