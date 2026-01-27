import { Text, View } from "react-native";
import { COLORS, FONTSIZE } from "../../constants/theme";
import styles from "./midText.style.js";


function MidText(props){

    return <View>
            <Text style={styles.innerText}>{props.innerText}</Text>
    </View>

}

export default MidText;