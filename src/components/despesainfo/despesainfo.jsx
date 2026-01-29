import { View } from "react-native";
import { Text } from "react-native";
import Style from "./despesainfo.style";


function DespesaInfo(props){



        return(
                <View style = {Style.container}>
                   
                    <Text style = {Style.title}>Gasto em {props.tipoDespesa}: R$:{props.valor}</Text> 
                   
                    
                   



                     </View>

        )

}


export default DespesaInfo;