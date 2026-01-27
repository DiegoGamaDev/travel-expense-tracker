import React, { useState, useEffect } from "react";
import Header from "../../components/header/header.jsx";
import {TextBox} from "../../components/textBox/textbox.jsx"
import Button from "../../components/button/button.jsx";
import styles from "./createAlimentacao.style.js"
import { ScrollView, View } from "react-native";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import { Alimentacao } from "../../entities/alimentacao.js";
import {formatDateToSQL}from "../../constants/dateformat.js";
import DropDownPadrao from "../../components/dropdownpadrao/dropdownpadrao.jsx";
import { formasPagamento, tipoAlimentacao } from "../../constants/dropdownitems.js";
import convertFloat from "../../constants/convertfloat.js";
import AbaPagamento from "../../components/abapagamento/abapagamento.jsx";
import { verificacaoAlimentacao } from "../../constants/verificacao.js";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createAlimentacaoDB, getAlimentacaoById, updateAlimentacaoDB } from "../../SQLite/sqlitescripts.jsx";

export function CreateAlimentacao() {

    const route = useRoute();
    const navigation = useNavigation();
    const { viagemId, tipoDespesa, id } = route.params || {};
    const [alimentacaoEdit, setAlimentacaoEdit] = useState();

    useEffect(() => {
        async function fetchAlimentacao() {
            if (id) {
                try {
                    const alimentacaoEditTemp = await getAlimentacaoById(id);
                    console.log(alimentacaoEdit)
                    setAlimentacaoEdit(alimentacaoEditTemp);
                    console.log('Alimentacao edit carregado com sucesso.');
                } catch (error) {
                    console.error("Erro ao carregar alimentacao:", error);
                }
            } 
        }
        fetchAlimentacao();
    }, [id]);

  

    const [data, setData] = useState(new Date());
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [local, setLocal] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [comentario, setComentario] = useState('');

    useEffect(()=>{

        if(alimentacaoEdit) {
            setData(new Date(alimentacaoEdit.data));
            setValor(String(alimentacaoEdit.valor));
            setTipo(String(alimentacaoEdit.tipoAlimentacao));
            setLocal(String(alimentacaoEdit.local));
            setPagamento(alimentacaoEdit.metodoPagamento);
            setComentario(alimentacaoEdit.descricao);
            console.log(alimentacaoEdit)
        }
    },[alimentacaoEdit]);

    async function printDetail () {
      
        const numericValor = parseFloat(convertFloat
            (valor,setValor,'Aviso', 'O valor pago fornecido não é um número válido.')) || 0;
            
            const props = {
                valor: numericValor,               
                local: local,               
                pagamento: pagamento,       
                tipoAlimentacao : tipo      
            };

            if (verificacaoAlimentacao(props)){

                const alimentacao  = new Alimentacao( 
                    formatDateToSQL(data),
                    numericValor,
                    local,
                    pagamento,
                    comentario,
                    tipo,
                    viagemId
                );
        
                try {
                if (!id) {
                    await createAlimentacaoDB({
                        data: alimentacao.data,
                        valor: alimentacao.valor,
                        comentario : alimentacao.comentario,
                        local: alimentacao.local,
                        pagamento: alimentacao.pagamento,
                        tipoAlimentacao: alimentacao.tipoAlimentacao,
                        idViagem: alimentacao.idViagem
                    })
                } else {
                    await updateAlimentacaoDB({
                        data: alimentacao.data,
                        valor: alimentacao.valor,
                        comentario : alimentacao.comentario,
                        pagamento: alimentacao.pagamento,
                        local: alimentacao.local,
                        tipoAlimentacao: alimentacao.tipoAlimentacao,
                        id: id
                    })
                    console.log('Update realizado com sucesso.')
                }

                navigation.goBack()

                } catch (error) {
                    console.error('Erro: ', error)
                }


            }else{
                console.warn('INSERÇÃO NEGADA')
                Alert.alert("! ATENÇÃO !", "Conferir as informações digitadas")
            }

        
        
    };



    

   return(<ScrollView style = {{flex: 1, zIndex:1}} automaticallyAdjustKeyboardInsets = {true}>

       <View style={styles.container}>

        <Header title="Adicionar alimentação"/>

        <View style = {styles.textFieldsContainer}>

        <DatePickerPadrao
         btntitle="Selecione a data"
         onChange={setData}
         date = {data}
         />

        <DropDownPadrao
        items={tipoAlimentacao}
        placeholder = "Selecione o tipo de alimentação"
        onValueChange={setTipo}
        valorInicial= {tipo}
        label={'Tipo de alimentação:'}
        />

        <TextBox label="Valor da alimentação (em Reais):"
        onChangeText = {setValor}
        value ={valor}
        placeholder = {'Digite o valor em R$'}
        />

        <TextBox label="Local de alimentação:"
        onChangeText = {setLocal}
        value ={local}
        placeholder = {'Digite o local da despesa'}
        />

        <AbaPagamento
        pagamento = {pagamento}
        onPress = {setPagamento}
        />  

        <TextBox label="Comentários:"
        onChangeText = {setComentario}
        value ={comentario}
        />
        </View>

       <View style={styles.button} >
        <Button 
        text="Salvar"
        onPress = {printDetail}/>
        </View>
        

    </View>
   </ScrollView>
    

   )
   

 


   
}

export default CreateAlimentacao;