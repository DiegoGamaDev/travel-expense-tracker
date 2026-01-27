import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Style from './abapagamento.style.js';
import { COLORS } from '../../constants/theme.js';

const AbaPagamento = (props) => {   

    const [selectedMethod, setSelectedMethod] = useState(props.pagamento || '');

    useEffect(() => {
        setSelectedMethod(props.pagamento || '');
    }, [props.pagamento]);

    const handlePress = (method) => {
        setSelectedMethod(method);
        props.onPress(method);
    };

    return (
        <View style={Style.container}>
            <Text style={Style.title}>Selecione o método de pagamento:</Text>
            <View style={Style.containerHorizontal}>
                <TouchableOpacity onPress={() => handlePress('Dinheiro')}>
                    <View style={[
                        Style.unidadePagamento,
                        { backgroundColor: selectedMethod === 'Dinheiro' ? COLORS.green : 'white' }
                    ]}>
                        <Text style={[
                            Style.textPagamento,
                            {color: selectedMethod === 'Dinheiro' ? 'white' : COLORS.darkgrey}
                        ]}>Dinheiro</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('Crédito')}>
                    <View style={[
                        Style.unidadePagamento,
                        { backgroundColor: selectedMethod === 'Crédito' ? COLORS.green : 'white' }
                    ]}>
                        <Text style={[
                            Style.textPagamento,
                            {color: selectedMethod === 'Crédito' ? 'white' : COLORS.darkgrey}
                        ]}>Crédito</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('Débito')}>
                    <View style={[
                        Style.unidadePagamento,
                        { backgroundColor: selectedMethod === 'Débito' ? COLORS.green : 'white' }
                    ]}>
                        <Text style={[
                            Style.textPagamento,
                            {color: selectedMethod === 'Débito' ? 'white' : COLORS.darkgrey}
                        ]}>Débito</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('Pix')}>
                    <View style={[
                        Style.unidadePagamento,
                        { backgroundColor: selectedMethod === 'Pix' ? COLORS.green : 'white' }
                    ]}>
                        <Text style={[
                            Style.textPagamento,
                            {color: selectedMethod === 'Pix' ? 'white' : COLORS.darkgrey}
                        ]}>Pix</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AbaPagamento;
