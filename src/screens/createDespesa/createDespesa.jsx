import Header from "../../components/header/header.jsx";
import {TextBox, TextBoxDiario} from "../../components/textBox/textbox.jsx"
import Button from "../../components/button/button.jsx";
import styles from "./createDespesa.style.js"
import { Alert, ScrollView, View } from "react-native";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import formatDate from "../../constants/dateformat.js";
import { useState, useEffect } from "react";
import { Despesa } from "../../entities/despesa.js";
import DropDownPadrao from "../../components/dropdownpadrao/dropdownpadrao.jsx";
import { formasPagamento } from "../../constants/dropdownitems.js";
import convertFloat from "../../constants/convertfloat.js";
import AbaPagamento from "../../components/abapagamento/abapagamento.jsx";
import { verificacaoDespesa } from "../../constants/verificacao.js";
import {  useNavigation, useRoute } from "@react-navigation/native";
import { formatDateToSQL } from "../../constants/dateformat.js";
import { createDespesaDB, getDespesaById, updateDespesaDB } from "../../SQLite/sqlitescripts.jsx";


export function CreateDespesa() {
    
    const route = useRoute();
    const navigation = useNavigation();
    const { viagemId, tipoDespesa, id } = route.params || {};
    const [despesaEdit, setDespesaEdit] = useState();

    useEffect(()=>{
        async function fetchDespesa(){
            if(id){
                try{
                const despesaEditTemp = await getDespesaById(id);
                setDespesaEdit(despesaEditTemp)
                console.log('Despesa edit carregada com sucesso.')
                }catch(error){
                    console.error("Erro ao carregar despesa:", error);
                }
            }
        }
        fetchDespesa();
    },[id]);

    const [data, setData] = useState(new Date());
    const [valor, setValor] = useState('');
    const [local, setLocal] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [comentario, setComentario] = useState('');
    const [idViagem, setIdViagem] = useState(viagemId ? viagemId : null);

    useEffect(()=>{
        if(despesaEdit){
            setData(new Date(despesaEdit.data));
            setValor(String(despesaEdit.valor));
            setLocal(String(despesaEdit.local));
            setPagamento(despesaEdit.metodoPagamento);
            setComentario(despesaEdit.descricao);
        }

    },[despesaEdit]);


    async function printDetail () {

        const numericValor = parseFloat(convertFloat(valor,setValor)) || 0;
        
        const props = {
            valor : numericValor,
            local,
            pagamento
        }

        if(verificacaoDespesa(props)){
            const despesa = new Despesa ( 
                formatDateToSQL(data),
                numericValor,
                local,
                pagamento,
                comentario,
                idViagem
            );
    
            try {
                if (!id) {
                    await createDespesaDB({
                        data: despesa.data,
                        valor: despesa.valor,
                        local: despesa.local,
                        pagamento: despesa.pagamento,
                        comentario: despesa.comentario,
                        idViagem : despesa.idViagem
                    })
                } else {

                    await updateDespesaDB({
                        data: despesa.data,
                        valor: despesa.valor,
                        local: despesa.local,
                        pagamento: despesa.pagamento,
                        comentario: despesa.comentario,
                        id: id
                    })
                }
            
                navigation.goBack()

            }catch(error){
                console.error('Erro ao inserir despesa: ', error)
            }


        }else {
            console.warn('INSERÇÃO NEGADA')
            Alert.alert("! ATENÇÃO !", "Conferir as informações digitadas")
        }
        
        
    }

   return (<ScrollView automaticallyAdjustKeyboardInsets = {true}>

       <View style={styles.container}>

        <Header title="Adicionar despesa"/>

        <View style = {styles.textFieldsContainer}>

        <DatePickerPadrao 
        btntitle="Selecione a data da despesa"
        onChange={setData}
        date ={data}
        />

        <TextBox label="Valor da despesa (em Reais):"
        onChangeText = {setValor}
        value = {valor}
        placeholder = {'Digite o valor em R$'}
        />

        <AbaPagamento
        onPress = {setPagamento}
        pagamento = {pagamento}
        />  

        <TextBox label="Local da despesa:"
        onChangeText = {setLocal}
        value = {local}
        placeholder = {'Digite o local da despesa'}
        />


        <TextBox label="Comentários:"
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
   </ScrollView>
    

   )
   

 
}

export default CreateDespesa;