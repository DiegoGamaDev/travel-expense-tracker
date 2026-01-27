import { Text, TouchableOpacityBase, View } from "react-native";
import { Style } from "./carddespesa.style";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

export function CardDespesa(props){
    
    return (
        <TouchableOpacity onPress = {props.onPress} onLongPress = {props.onLongPress}>
            

        <View style = {Style.cardcontainer}>
           
            
                <View style = {Style.containerLocalInicio} >
                
                <Text style = {Style.Text}>
                     {'Data: ' + props.data}
                </Text> 
                    
                    <Image
                    source={props.source} 
                    style={Style.icon} 
                />
                </View>

                <Text style = {Style.TextInfoSaida}>
                     {'Local: ' + props.local}
                    </Text>
                   
            
            <View style = {Style.containerLocalInicio}>
            <Text style = {Style.TextInfoSaida}>
                {'Valor R$: ' + props.valor.toFixed(2)}
             </Text>
            <Text style = {Style.TextInfos}>
            {props.valorLitro}
            </Text>
            </View>

            <View style = {Style.linha}/>
            <Text style = {Style.TextInfos}>
            {'Comentário: ' + props.comentario}
            </Text>

           

        </View>
        
        </TouchableOpacity>
    )

}; 