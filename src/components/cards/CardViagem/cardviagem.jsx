import { Text, TouchableOpacityBase, View } from "react-native";
import { Style } from "./cardviagem.style";
import { TouchableOpacity } from "react-native";


export function CardViagem(props){

    return (
        <TouchableOpacity onPress={()=> props.onPress()}  onLongPress = {()=> props.onLongPress()}>

        <View style = {Style.cardcontainer}>
            <Text style = {Style.Text}>
               {props.title}
            </Text>
            
                <View style = {Style.containerLocalInicio} >
                    <Text style = {Style.TextInfoSaida}>
                     {'Local de partida: ' + props.localDePartida}
                    </Text>

                    <Text style = {Style.TextInfoSaida}>
                        {'Inicio: ' + props.dataDeInicio}
                    </Text>
                </View>


            <View style = {Style.linha}/>
            <Text style = {Style.TextInfos}>
            {'Quilometragem percorrida: ' + props.kmPercorrido}
            </Text>

            <Text style = {Style.TextInfos}>
            {'Gasto parcial: ' + props.gastoParcial}
            </Text>

        </View>
        </TouchableOpacity>

    )

}; 