import Header from "../../components/header/header.jsx";
import {TextBox} from "../../components/textBox/textbox.jsx"
import Button from "../../components/button/button.jsx";
import styles from "./createEstacionamento.style.js"
import { Alert, KeyboardAvoidingView, ScrollView, View } from "react-native";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import {formatDateToSQL} from "../../constants/dateformat.js";
import { Estacionamento } from "../../entities/estacionamento.js";
import { useState, useEffect } from "react";
import convertFloat from "../../constants/convertfloat.js";
import AbaPagamento from "../../components/abapagamento/abapagamento.jsx";
import { verificacaoEstacionamento } from "../../constants/verificacao.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createEstacionamentoDB, getEstacionamentoById, updateEstacionamentoDB } from "../../SQLite/sqlitescripts.jsx";

export function CreateEstacionamento() {
    const navigation = useNavigation();
    const route = useRoute();
    const { viagemId, tipoDespesa, id } = route.params || {};
    const [estacionamentoEdit, setEstacionamentoEdit] = useState();
   
    useEffect(()=>{
      async function fetchEstacionamento(){
        if(id){
        try {
            const estacionamentoEditTemp = await getEstacionamentoById(id);
            setEstacionamentoEdit(estacionamentoEditTemp);
            console.log('Estacionamento edit carregado com sucesso.')
        } catch (error) {
        console.log('Erro ao carregar estacionamento edit: ', error)
        }
        } 
      }
      fetchEstacionamento();
    },[id]);

    const[data,setData] = useState(new Date());
    const [valor, setValor] = useState('');
    const [local, setLocal] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [comentario, setComentario] = useState('');
    const [quantidadeHoras, setQuantidadeHoras] = useState(0);

    useEffect(()=>{
        if(estacionamentoEdit){
            setData(new Date(estacionamentoEdit.data));
            setValor(String(estacionamentoEdit.valor));
            setLocal(String(estacionamentoEdit.local))
            setPagamento(estacionamentoEdit.metodoPagamento);
            setComentario(estacionamentoEdit.descricao);
            setQuantidadeHoras(String(estacionamentoEdit.quantidadeHoras));
        }
    },[estacionamentoEdit])

    async function printDetail () {
        const numericValor = parseFloat(convertFloat(valor,setValor)) || 0;

        const props = {
           valor: numericValor,
           local: local,
           pagamento: pagamento,
           horasEstacionadas: quantidadeHoras 
        }


        if(verificacaoEstacionamento(props)){
       

        const estacionamento = new Estacionamento ( 
            formatDateToSQL(data),
            numericValor,
            local,
            pagamento,
            comentario,
            quantidadeHoras,
            viagemId
        );

        try {
            if (!id) {
                await createEstacionamentoDB({
                data: estacionamento.data,
                valor: estacionamento.valor,
                local: estacionamento.local,
                pagamento: estacionamento.pagamento,
                comentario: estacionamento.comentario,
                quantidadeHoras: estacionamento.quantidadeHoras,
                idViagem: estacionamento.idViagem
                })

            } else {
                await updateEstacionamentoDB({
                data: estacionamento.data,
                valor: estacionamento.valor,
                local: estacionamento.local,
                pagamento: estacionamento.pagamento,
                comentario: estacionamento.comentario,
                quantidadeHoras: estacionamento.quantidadeHoras,
                id: id
                })
            }

            navigation.goBack()

        } catch (error) {
            console.error('Erro ao inserir estacionamento: ', error)
        }


        } else {
            console.warn('INSERÇÃO NEGADA')
            Alert.alert("! ATENÇÃO !", "Conferir as informações digitadas")
        }
    }

   return(<ScrollView automaticallyAdjustKeyboardInsets = {true}>
    <KeyboardAvoidingView>

       <View style={styles.container}>

        <Header title="Adicionar estacionamento"/>

        <View style = {styles.textFieldsContainer}>

        <DatePickerPadrao 
        btntitle="Selecione a data do estacionamento"
        onChange={setData}
        date = {data}
        />

        <TextBox 
        label="Valor do estacionamnto (em Reais):"
        onChangeText = {setValor}
        value = {valor}
        placeholder = {'Digite o valor em R$'}
        
        />

        <AbaPagamento
        onPress = {setPagamento}
        pagamento = {pagamento}
        />  

        <TextBox
         label="Quantidade de horas estacionadas:"
         onChangeText = {setQuantidadeHoras}
         value = {quantidadeHoras}
         placeholder = {'Somente horas cheias'}
         />

        <TextBox
        label="Local de estacionamento:"
        onChangeText = {setLocal}
        value = {local}
        placeholder = {'Digite o local da despesa'}
        />


        <TextBox 
        label="Comentários:"
        onChangeText = {setComentario}
        value = {comentario}
        />

        </View>

        <View style={styles.button}>
        <Button text="Salvar"
        onPress = {printDetail}
        />
        </View>

    </View>
        </KeyboardAvoidingView>
   </ScrollView>
    

   )
   

 
}

export default CreateEstacionamento;