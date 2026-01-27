import { SafeAreaView, Text, View, Image } from "react-native";
import theme from "../../constants/theme.js";
import styles from "./firstTimeScreen.style.js";
import Header from "../../components/header/header.jsx";
import MidText from "../../components/midText/midText.jsx";
import Button from "../../components/button/button.jsx";
import images from "../../constants/images.js";

export function FirstTimeScreen() {
  return (
      

      <View 
      style={styles.container}>
  
        <MidText innerText={firstEntryText()} />
        <Button text = "Vamos nessa!"/>
        <Image style={styles.logo} source= {images.logoDefault}/>
      </View>

  );
}

function firstEntryText() {
  return "Bem-vindo! \n Aparentemente você não tem uma viagem criada ainda! \n Vamos criar sua primeira viagem!";
}

export default FirstTimeScreen;
