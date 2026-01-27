import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import { ScrollView, View, Text } from "react-native";
import styles from "./menuviagens.style";
import { CardViagem } from "../../components/cards/CardViagem/cardviagem";
import Button from "../../components/button/button";
import { calcularGastoTotal, getAllViagens, deleteByTableId } from "../../SQLite/sqlitescripts";
import { formatDateReadSQL } from "../../constants/dateformat";
import { useFocusEffect } from "@react-navigation/native";
import { Alert } from "react-native";



export function MenuViagens(props) {
    const [viagens, setViagens] = useState([]);
    const [gastos, setGastos] = useState({});  // Estado para armazenar os gastos de cada viagem

    // Função para carregar viagens
    const loadViagens = async () => {
        const viagensData = await getAllViagens();
        setViagens(viagensData);
    };

    // Função para carregar e calcular os gastos totais
    const loadGastoTotal = async (idViagem) => {
        const gastoTotal = await calcularGastoTotal(idViagem); // Aguarda o cálculo do gasto total
        setGastos((prevState) => ({
            ...prevState,
            [idViagem]: gastoTotal, // Armazena o gasto total para a viagem específica
        }));
    };

    // Carrega as viagens quando o componente é montado
    useEffect(() => {
        const viagensDB = async () => {
            const viagensData = await getAllViagens();
            setViagens(viagensData);
        };
        viagensDB();
    }, []);
    
    // Carrega os gastos totais de todas as viagens após carregar as viagens
    useEffect(() => {
        viagens.forEach(item => {
            loadGastoTotal(item.id);  // Calcula o gasto total para cada viagem
        });
    }, [viagens]);  // Recalcula os gastos sempre que as viagens mudarem
    
    // Atualiza as viagens quando a tela é focada
    useFocusEffect(React.useCallback(() => {
        loadViagens();
    }, []));

    return (
        <View style={styles.container}>
            <Header title={"Selecione sua viagem:"} />
            <ScrollView style={styles.scrollview}>
                <View style={styles.textFieldsContainer}>
                    {viagens.slice().reverse().map((item) => {
                        // Verifica se o gasto total foi calculado
                        const gastoFormatado = gastos[item.id]
                            ? `R$: ${gastos[item.id].toFixed(2)}`
                            : "R$: 0,00"; // Exibe "R$: 0,00" até o cálculo ser concluído

                        return (
                            <CardViagem
                                onPress={() =>
                                    props.navigation.navigate("mainMenu", { viagemId: item.id })
                                }
                                key={item.id}
                                title={item.nome}
                                localDePartida={item.localDePartida}
                                dataDeInicio={formatDateReadSQL(item.dataDeInicio)}
                                kmPercorrido={item.kilometragemParcial || "Não definido"}
                                gastoParcial={gastoFormatado} 
                                onLongPress={() => {
                                    Alert.alert(
                                        item.nome,
                                        "O que você deseja fazer?",
                                        [
                                            { text: 'Fechar', style: 'cancel' },
                                            {
                                                text: 'Delete',
                                                style: 'destructive',
                                                onPress: () => {
                                                    Alert.alert(
                                                        'Confirmar Exclusão',
                                                        'Você tem certeza que deseja deletar esta despesa?',
                                                        [
                                                            { text: 'Cancelar', style: 'cancel' },
                                                            {
                                                                text: 'SIM',
                                                                style: 'destructive',
                                                                onPress: async () => {
                                                                    try {
                                                                        await deleteByTableId({ table: 'viagem', id: item.id });
                                                                        loadViagens();
                                                                    } catch (error) {
                                                                        console.error('Erro ao deletar: ', error);
                                                                    }
                                                                },
                                                            },
                                                        ],
                                                        { cancelable: true }
                                                    );
                                                },
                                            },
                                        ],
                                        { cancelable: true }
                                    );
                                }}
                            />
                        );
                    })}
                </View>

                <Button
                    onPress={() => props.navigation.navigate("createTrip")}
                    text={"Adicionar viagem"}
                    style={styles.button}
                />
            </ScrollView>
        </View>
    );
}
