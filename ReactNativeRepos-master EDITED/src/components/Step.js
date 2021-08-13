import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Step = () => (
  <Image source={require('../assets/Step.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
});

export default memo(Step);