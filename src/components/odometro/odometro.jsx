import Style from "./odometro.style";
import { View } from "react-native";
import { Text } from "react-native";


function Odometro (props) {

    return (
        <View style = {Style.container}> 

            <Text style = {Style.title}>
                Ultimo odômetro registrado: {props.odometro} 
            </Text>


        </View>

    )


}


export default Odometro;

