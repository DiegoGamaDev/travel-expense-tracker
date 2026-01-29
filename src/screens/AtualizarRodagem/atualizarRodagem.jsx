import React, { useState, useEffect } from "react";
import { ScrollView, View } from 'react-native';
import Header from "../../components/header/header.jsx";
import { TextBox } from "../../components/textBox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import styles from "./atualizarRodagem.style.js";
import Odometro from "../../components/odometro/odometro.jsx";
import { updateRodagemDB } from "../../SQLite/sqlitescripts.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";

export function AtualizarRodagem() {

    const route = useRoute();
    const navigation = useNavigation();
    const { viagemId } = route.params || {};

    const [odometroInicial, setOdometroInicial] = useState(0);
    const [odometroAtual, setOdometroAtual] = useState('');
    const [rodagemRegistrada, setRodagemRegistrada] = useState(0);
    
    const ultimoOdometro = odometroInicial + rodagemRegistrada;

    
    // Carrega valores iniciais da viagem - testando
    useEffect(() => {
        const { kilometragemInicial, kilometragemParcial } = route.params || {};
        setOdometroInicial(Number(kilometragemInicial) || 0);
        setRodagemRegistrada(Number(kilometragemParcial) || 0);
                
        }, [route.params]);


   
 
    // Valida input em tempo real (somente números) - Chat me ajudou demais nessa! Não sabia fazer isso sozinho nem na lua. 
    function verificarTexto(text) {
        const verificado = text.replace(/[^0-9]/g, '');
        setOdometroAtual(verificado);
    }

    // Atualiza a rodagem no banco de dados (como kilometragemParcial)
    async function handleAtualizarRodagem() {

    const kmAtual = Number(odometroAtual);

    if (!odometroAtual || isNaN(kmAtual)) {
        alert('Informe uma kilometragem válida');
        return;
    }
    
     const ultimoOdometro = odometroInicial + rodagemRegistrada;   

    if (kmAtual < ultimoOdometro) {
        alert(
            `O odômetro não pode ser menor que o último registrado (${ultimoOdometro} km)`
        );
        return;
    }

    if (kmAtual < odometroInicial) {
        alert('A kilometragem atual não pode ser menor que a registrada inicialmente');
        return;
    }

    const novaRodagem = kmAtual - odometroInicial;


    await updateRodagemDB({viagemId, novaRodagem});
    navigation.goBack();
}


    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View style={styles.container}>
                <Header title={"Atualizar Rodagem"} />

                <Odometro odometro = {ultimoOdometro}></Odometro>

                <View style={styles.textFieldsContainer}>
                    <TextBox
                        label={'Informe a kilometragem atual do veículo'}
                        value={odometroAtual}
                        onChangeText={verificarTexto}
                        placeholder={'informe o valor do odometro atual'}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.button}>
                    <Button
                        text={'Atualizar rodagem'}
                        onPress={handleAtualizarRodagem}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default AtualizarRodagem;
