import { Text, TouchableOpacity } from "react-native";
import {styles} from "./button.style.js"

function Button(props){

    return <TouchableOpacity style={styles.btnDefault} onPress ={(props.onPress)}>
        
        <Text style = { styles.textBtn}> {props.text} </Text>
    
    </TouchableOpacity>

}

export default Button;