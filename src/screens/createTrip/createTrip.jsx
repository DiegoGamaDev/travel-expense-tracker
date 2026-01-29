import Header from "../../components/header/header.jsx";
import { TextBox } from "../../components/textBox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import styles from "./createTrip.style.js";
import { ScrollView, View, Alert } from "react-native";
import { useState, useEffect } from "react";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import { formatDateToSQL } from "../../constants/dateformat.js";
import { verificacaoViagem } from "../../constants/verificacao.js";
import { createTripDB, updateTripDB, getViagemById } from "../../SQLite/sqlitescripts.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";

export function CreateTrip() {
    const route = useRoute();
    const navigation = useNavigation();
    const { viagemId } = route.params || {};

    const [nome, setNome] = useState('');
    const [data, setData] = useState(viagemId ? null : new Date());
    const [localDePartida, setLocalDePartida] = useState('');
    const [destinoFinal, setDestinoFinal] = useState('');
    const [kilometragemInicial, setKilometragemInicial] = useState(0);
    const [kilometragemParcial, setKilometragemParcial] = useState(0);
    const [kilometragemOriginal, setKilometragemOriginal] = useState(0);

    useEffect(() => {
        async function fetchViagem() {
            if (viagemId) {
                try {
                    const viagem = await getViagemById(viagemId);
                    if (viagem) {
                        setNome(viagem.nome);
                        setData(new Date(viagem.dataDeInicio));
                        setLocalDePartida(viagem.localDePartida);
                        setDestinoFinal(viagem.destinoFinal);
                        setKilometragemParcial(viagem.kilometragemParcial);
                        setKilometragemInicial(viagem.kilometragemInicial ?? 0);
                        setKilometragemOriginal(viagem.kilometragemInicial);
                    }
                } catch (error) {
                    console.error("Erro ao carregar viagem:", error);
                    Alert.alert("Erro", "Ocorreu um erro ao carregar a viagem.");
                }
            }
        }
        fetchViagem().catch((error) => {
            console.error("Unhandled error in fetchViagem:", error);
        });
    }, [viagemId]);

    const processarCriarOuEditarViagem = async () => {
    if (!nome.trim() || !localDePartida.trim() || !kilometragemInicial) {
        Alert.alert("Atenção", "Preencha os campos obrigatórios.");
        return;
    }

    const dados = {
        nome,
        localDePartida,
        kilometragemInicial,
    };

    if (verificacaoViagem(dados)) {
        try {

            
            if (viagemId && kilometragemInicial != kilometragemOriginal) {

                Alert.alert(
                    "Atenção",
                    "Você alterou a kilometragem inicial.\n\nIsso vai reiniciar a rodagem da viagem.\nDeseja continuar?",
                    [
                        {
                            text: "Cancelar",
                            style: "cancel",
                            onPress: () => {
                                return; 
                            }
                        },
                        {
                            text: "Continuar",
                            onPress: async () => {
                                try {
                                    await updateTripDB({
                                        id: viagemId,
                                        nome,
                                        data: formatDateToSQL(data),
                                        local: localDePartida,
                                        destino: destinoFinal,
                                        kmInicial: kilometragemInicial,
                                        kmParcial: 0, 
                                    });

                                    Alert.alert("Sucesso", "Viagem atualizada e rodagem reiniciada!");
                                    navigation.navigate('menuViagens');
                                } catch (error) {
                                    console.error('Erro ao fazer update com reset: ', error);
                                }
                            }
                        }
                    ]
                );

                return; 
            }

            
            if (viagemId) {
                console.log('Entrou em Update');
                try {
                    await updateTripDB({
                        id: viagemId,
                        nome,
                        data: formatDateToSQL(data),
                        local: localDePartida,
                        destino: destinoFinal,
                        kmInicial: kilometragemInicial,
                        kmParcial: kilometragemParcial,
                    });
                    Alert.alert("Sucesso", "Viagem atualizada com sucesso!");
                } catch (error) {
                    console.error('Erro ao fazer update: ', error);
                }

            
            } else {
                try {
                    await createTripDB({
                        nome,
                        data: formatDateToSQL(data),
                        local: localDePartida,
                        destino: destinoFinal,
                        kmInicial: kilometragemInicial,
                    });
                    Alert.alert("Sucesso", "Viagem criada com sucesso!");
                } catch (error) {
                    console.error('Erro ao criar viagem: ', error);
                }
            }

            navigation.navigate('menuViagens');

        } catch (error) {
            console.error("Erro ao salvar viagem:", error);
            Alert.alert("Erro", "Ocorreu um problema ao salvar a viagem.");
        }
    } else {
        Alert.alert("Atenção", "Conferir as informações digitadas.");
    }
};

    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
            <View style={styles.container}>
                <Header title={viagemId ? "Editar Viagem" : "Criar Viagem"} />
                <View style={styles.textFieldsContainer}>
                    <DatePickerPadrao
                        btntitle="Selecione a data de início"
                        onChange={setData}
                        date={data}
                    />
                    <TextBox
                        label={'De um nome para sua viagem'}
                        onChangeText={setNome}
                        value={nome}
                        placeholder={'Dê um nome para sua viagem'}
                    />
                    <TextBox
                        label={'Qual local de partida?'}
                        onChangeText={setLocalDePartida}
                        value={localDePartida}
                        placeholder={'Digite seu local de partida'}
                    />
                    <TextBox
                        label={'Qual o destino final?'}
                        onChangeText={setDestinoFinal}
                        value={destinoFinal}
                        placeholder={'Não obrigatório'}
                    />
                    <TextBox
                        label={'Qual a kilometragem inicial?'}
                        onChangeText={(text) => setKilometragemInicial(parseInt(text) || 0)}
                        value={kilometragemInicial.toString()}
                        placeholder={'Número inteiro sem pontos'}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        text={viagemId ? 'Salvar Atualização' : "Criar Viagem"}
                        onPress={processarCriarOuEditarViagem}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default CreateTrip;
