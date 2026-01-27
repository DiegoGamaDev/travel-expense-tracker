import { Text, View } from "react-native";
import { COLORS, FONTSIZE } from "../../constants/theme";
import styles from "./header.style.js";


function Header(props){

    return <View style = {styles.appBar }>
            <Text style = { styles.textBar}>
                {props.title}
            </Text>

    </View>

}

export default Header;