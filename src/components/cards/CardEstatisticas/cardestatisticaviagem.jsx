import { Text, TouchableOpacityBase, View } from "react-native";
import { Style } from "./cardestatisticaviagem.style";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";


export function CardEstatistica({ itens }) {
  return (
    <View style={Style.cardcontainer}>
      {itens.map((item, index) => (
        <Text key={index} style={Style.Text}>
          {item.label}: {item.value}
        </Text>
      ))}
    </View>
  );
}


export default CardEstatistica;