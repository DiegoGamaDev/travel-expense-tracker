import React from 'react';
import { Text, TextInput, View } from 'react-native';
import styles from './textbox.style.js'; 

// Componente TextBox padrão
export function TextBox(props) {
  return (
    <View style={styles.containerTextBox}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput 
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={(text) => props.onChangeText(text)}
        value={props.value}
      />
    </View>
  );
}

// Componente TextBoxDiario com estilos e funcionalidades específicas
export function TextBoxDiario(props) {
  return (
      
      <View style={styles.containerTextBox}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput 
        style={styles.inputDiario} 
        placeholder={props.placeholder}
        onChangeText={(text) => props.onChangeText(text)}
        value={props.value}
      />
    </View>
  );
}
