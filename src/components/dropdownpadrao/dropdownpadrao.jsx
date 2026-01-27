import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Style } from './dropdownpadrao.style';
import { Text } from 'react-native';

const DropDownPadrao = ({ items, placeholder = '', onValueChange, label, valorInicial }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(valorInicial);

    // Atualiza o valor inicial quando ele mudar
    useEffect(() => {
        setCurrentValue(valorInicial);
    }, [valorInicial]);

    // Função chamada quando o valor muda
    const handleValueChange = (value) => {
        setCurrentValue(value);
        if (onValueChange) {
            onValueChange(value);
        }
    };

    return (
        <>
            <Text style={Style.label}>
                {label}
            </Text>
            <DropDownPicker
                style={Style.dropdownstyle}
                items={items}
                open={isOpen}
                setOpen={() => setIsOpen(!isOpen)}
                value={currentValue}
                setValue={handleValueChange}
                placeholder={placeholder}
                placeholderStyle={Style.placeholderstyle}
            />
        </>
    );
};

export default DropDownPadrao;
