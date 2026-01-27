import React from 'react';
import { TextInput, View } from 'react-native';
import styles from './searchbox.style.js'; 

export function SearchBox({ placeholder, onChangeText, value }) {
  return (
    <View style={styles.containerTextBox}>     
      <TextInput 
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText} 
        value={value}
      />
    </View>
  );
}
