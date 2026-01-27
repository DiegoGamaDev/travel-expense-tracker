import React, { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, TouchableOpacity, Platform } from "react-native";
import styles from "./datepicker.style.js";

export function DatePickerPadrao({ btntitle, onChange, date }) {
    
    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(date || new Date());

    useEffect(() => {
        if (date) {
            setSelectedDate(new Date(date));  // Atualiza o estado se 'date' mudar
        }
    }, [date]);

    const handleDateChange = (event, pickedDate) => {  // Renomeado para evitar conflito
        const currentDate = pickedDate || selectedDate;
        setShow(Platform.OS === 'ios');
        setSelectedDate(currentDate);
        onChange(currentDate); // Passa a data selecionada para o pai
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.dateComponent}>
                {`Data selecionada: ${formatDate(selectedDate)}`}
            </Text>
            <TouchableOpacity
                onPress={() => setShow(true)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{btntitle}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
}
