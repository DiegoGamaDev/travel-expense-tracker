import React, { useState, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import Header from "../../components/header/header.jsx";
import { TextBox } from "../../components/textBox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import styles from "./createAbastecimento.style.js";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import { Abastecimento } from "../../entities/abastecimento.js";
import { formatDateToSQL } from "../../constants/dateformat.js";
import convertFloat from "../../constants/convertfloat.js";
import AbaPagamento from "../../components/abapagamento/abapagamento.jsx";
import { verificacaoAbastecimento } from "../../constants/verificacao.js";
import { createAbastecimentoDB, getAbastecimentoById, updateAbastecimentoDB } from "../../SQLite/sqlitescripts.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";

export function CreateAbastecimento() {
    const route = useRoute();
    const navigation = useNavigation();
    const { viagemId, tipoDespesa, id } = route.params || {};
    const [abastecimentoEdit, setAbastecimentoEdit] = useState();

    useEffect(() => {
        async function fetchAbastecimento() {
            if (id) {
                try {
                    const abastecimentoEditTemp = await getAbastecimentoById(id);
                    setAbastecimentoEdit(abastecimentoEditTemp);
                    console.log('Abastecimento edit carregado com sucesso.');
                } catch (error) {
                    console.error("Erro ao carregar abastecimento:", error);
                }
            } 
        }
        fetchAbastecimento();
    }, [id]);

    const [data, setData] = useState(new Date());
    const [valor, setValor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [local, setLocal] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [comentario, setComentario] = useState('');

    useEffect(() => {
        if (abastecimentoEdit) {
            setData(new Date(abastecimentoEdit.data));
            setValor(String(abastecimentoEdit.valor));
            setQuantidade(String(abastecimentoEdit.quantidadeCombustivel));
            setLocal(abastecimentoEdit.local);
            setPagamento(abastecimentoEdit.metodoPagamento);
            setComentario(abastecimentoEdit.descricao);
            console.log(abastecimentoEdit);
        }
    }, [abastecimentoEdit]);

    async function insertAbastecimento () {
        const numericValor = parseFloat(convertFloat(valor, setValor)) || 0;
        const numericQuantidade = parseFloat(convertFloat(quantidade, setQuantidade)) || 0;

        const props = { valor: numericValor, local, pagamento, quantidade: numericQuantidade };

        if (verificacaoAbastecimento(props)) {
            const abastecimento = new Abastecimento(
                formatDateToSQL(data),
                numericValor,
                local,
                pagamento,
                comentario,
                numericQuantidade,
                viagemId
            );

            try {
                if (!id) {
                    await createAbastecimentoDB({
                        data: abastecimento.data,
                        valor: abastecimento.valor,
                        comentario: abastecimento.comentario,
                        pagamento: abastecimento.pagamento,
                        local: abastecimento.local,
                        quantidade: abastecimento.quantidade,
                        valorPorLitro: abastecimento.valorPorLitro,
                        idViagem: viagemId
                    })
                } else {
                
                    await updateAbastecimentoDB({
                        
                        data: abastecimento.data,
                        valor: abastecimento.valor,
                        comentario: abastecimento.comentario,
                        pagamento: abastecimento.pagamento,
                        local: abastecimento.local,
                        quantidade: abastecimento.quantidade,
                        valorPorLitro: abastecimento.valorPorLitro,
                        id: id
                    })

                    console.log('Update realizado com sucesso.')

                };
                navigation.goBack();
            } catch (error) {
                console.log("Erro printDetail - createAbastecimento: ", error);
            }
        } else {
            console.warn('INSERÇÃO NEGADA');
            Alert.alert("! ATENÇÃO !", "Conferir as informações digitadas");
        }
    };

    return (
        <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}>
            <View style={styles.container}>
                <Header title="Adicionar abastecimento" />
                <View style={styles.textFieldsContainer}>
                
                    <DatePickerPadrao
                         btntitle="Selecione a data do abastecimento"
                         onChange={setData}
                         date={data} 
                        />

                    <TextBox
                        label="Valor do abastecimento (em Reais):"
                        onChangeText={setValor}
                        value={valor}
                        keyboardType="numeric"
                        placeholder="Digite o valor em R$"
                    />
                    <AbaPagamento
                        pagamento={pagamento} 
                        onPress={setPagamento}
                    />
                    <TextBox
                        label="Quantidade de combustível:"
                        onChangeText={setQuantidade}
                        value={quantidade}
                        keyboardType="numeric"
                        placeholder="Digite a quantidade abastecida em litros"
                    />
                    <TextBox
                        label="Local do abastecimento:"
                        onChangeText={setLocal}
                        value={local}
                        placeholder="Digite o local da despesa"
                    />
                    <TextBox
                        label="Comentários:"
                        onChangeText={setComentario}
                        value={comentario}
                    />
                </View>
                <View style={styles.button}>
                    <Button text="Salvar" onPress={insertAbastecimento} />
                </View>
            </View>
        </ScrollView>
    );
}

export default CreateAbastecimento;
