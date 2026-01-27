import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './fab.style'

const FloatActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
};



export default FloatActionButton;
