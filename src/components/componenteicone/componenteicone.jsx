import React from 'react'; // Importando React
import { View, TouchableOpacity, Image, Text } from "react-native"; 
import Icons from '../../constants/icons.js';
import Style from './componenteicone.style.js';



function ComponentIcon(props) {
    return (
        <View style = {Style.container}>
            <TouchableOpacity onPress={props.onPress}> 
                <Image
                    source={props.source} 
                    style={Style.icon} 
                />
                <View style = {Style.containerLabel}>
                <Text style = {Style.label}>
                    {props.label}
                </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default ComponentIcon;
