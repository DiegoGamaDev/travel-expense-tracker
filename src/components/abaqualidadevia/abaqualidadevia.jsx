import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Style from './abaqualidadevia.style.js';
import { COLORS } from '../../constants/theme.js';

const AbaQualidadeVia = (props) => {   

    useEffect(() => {
        setSelectedMethod(props.qualidadeDaVia || '');
    }, [props.qualidadeDaVia]);

    const [selectedMethod, setSelectedMethod] = useState(props.qualidadeDaVia ? props.qualidadeDaVia :'');

    const handlePress = (method) => {
        setSelectedMethod(method);
        props.onPress(method);
    };

    return (
        <View style={Style.container}>
            <Text style={Style.title}>Selecione a qualidade da via:</Text>
            <View style={Style.containerHorizontal}>
                
                
            <TouchableOpacity onPress={() => handlePress('Péssima')}>
                    
                    <View style={[
                        Style.unidadeQualidadeVia,
                        { backgroundColor: selectedMethod === 'Péssima' ? COLORS.red : 'white' }
                         ]}>
                        
                        <Text style={[
                            Style.textComponent,
                            {color: selectedMethod === 'Péssima' ? 'white' : COLORS.darkgrey}
                            ]}>{'Péssima'}</Text>
                     </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => handlePress('Ruim')}>
                    
                    <View style={[
                        Style.unidadeQualidadeVia,
                        { backgroundColor: selectedMethod === 'Ruim' ? COLORS.orange : 'white' }
                         ]}>
                        
                        <Text style={[
                            Style.textComponent,
                            {color: selectedMethod === 'Ruim' ? 'white' : COLORS.darkgrey}
                            ]}>{'Ruim'}</Text>
                     </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => handlePress('Regular')}>
                    <View style={[
                        Style.unidadeQualidadeVia,
                        { backgroundColor: selectedMethod === 'Regular' ? COLORS.yellow : 'white' }
                    ]}>
                        <Text 
                        style={[
                            Style.textComponent,
                            {color: selectedMethod === 'Regular' ? 'white' : COLORS.darkgrey}
                            ]}>{'Regular'}</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => handlePress('Boa')}>
                    <View style={[
                        Style.unidadeQualidadeVia,
                        { backgroundColor: selectedMethod === 'Boa' ? COLORS.softgreen : 'white' }
                    ]}>
                       
                
                        <Text
                         style={[Style.textComponent,
                            {color: selectedMethod === 'Boa' ? 'white' : COLORS.darkgrey}
                         ]}>{'Boa'}</Text>
                    
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('Excelente')}>
                    <View style={[
                        Style.unidadeQualidadeVia,
                        { backgroundColor: selectedMethod === 'Excelente' ? COLORS.vividgreen : 'white' }
                    ]}>
                        <Text style={[Style.textComponent,
                            {color: selectedMethod === 'Excelente' ? 'white' : COLORS.darkgrey}
                         ]}>{'Excelente'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AbaQualidadeVia;
