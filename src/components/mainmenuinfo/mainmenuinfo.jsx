import { View } from "react-native";
import { Text } from "react-native";
import Style from "./mainmenuinfo.style";

import { TESTES } from "../../constants/dropdownitems";


function MainMenuInfo(props){



        return(
                <View style = {Style.container}>
                   
                    <Text style = {Style.title}>Gasto até o momento: R$:{props.valor}</Text> 
                   
                    
                   



                     </View>

        )

}


export default MainMenuInfo;