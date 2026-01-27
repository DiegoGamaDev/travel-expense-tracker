import { Alert } from 'react-native'; // Import Alert from React Native

const convertFloat = (value, setValue) => {
    let valueString = value.trim();

    // Verifique se o valor contém apenas números, vírgulas ou pontos
    const validInputPattern = /^[0-9.,]*$/;
    if (!validInputPattern.test(valueString)) {
        
        if (setValue) setValue(''); 
        return ''; 
    }

    // Substitua vírgulas por pontos
    valueString = valueString.replace(/,/g, '.');

    // Converta a string para um número
    let valueFinal = parseFloat(valueString);

    // Verifique se é um número válido
    if (isNaN(valueFinal)) {
        
        if (setValue) setValue(''); 
        return ''; 
    } else {
        let formattedValue = valueFinal.toFixed(2);
        console.log('Valor formatado:', formattedValue);
        return formattedValue;
    }
};

export default convertFloat;
