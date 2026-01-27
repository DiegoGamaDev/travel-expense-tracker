import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Picker } from "react-native";

export function MonthYearPicker({ btntitle, onChange }) {
    const currentYear = new Date().getFullYear();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [show, setShow] = useState(false);

    const handleConfirm = () => {
        const selectedDate = new Date(selectedYear, selectedMonth);
        onChange(selectedDate); // Passa a data selecionada ao componente pai
        setShow(false);
    };

    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const years = Array.from({ length: 20 }, (_, i) => currentYear - i); // Lista de anos para os últimos 20 anos

    return (
        <View style={styles.container}>
            <Text style={styles.dateComponent}>
                {`Data selecionada: ${months[selectedMonth]} ${selectedYear}`}
            </Text>
            <TouchableOpacity onPress={() => setShow(true)} style={styles.button}>
                <Text style={styles.buttonText}>{btntitle}</Text>
            </TouchableOpacity>

            {show && (
                <Modal transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Picker
                                selectedValue={selectedMonth}
                                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                                style={styles.picker}
                            >
                                {months.map((month, index) => (
                                    <Picker.Item key={index} label={month} value={index} />
                                ))}
                            </Picker>
                            <Picker
                                selectedValue={selectedYear}
                                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                                style={styles.picker}
                            >
                                {years.map((year, index) => (
                                    <Picker.Item key={index} label={year.toString()} value={year} />
                                ))}
                            </Picker>
                            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 10,
    },
    dateComponent: {
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    picker: {
        width: '100%',
        height: 150,
    },
    confirmButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
});
