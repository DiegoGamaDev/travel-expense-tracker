import Header from "../../components/header/header.jsx";
import {TextBox} from "../../components/textBox/textbox.jsx"
import Button from "../../components/button/button.jsx";
import styles from "./createPedagio.style.js"
import { Alert, ScrollView, View } from "react-native";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import { Pedagio } from "../../entities/pedagio.js";
import { useState, useEffect } from "react";
import {formatDateToSQL} from "../../constants/dateformat.js";
import AbaPagamento from "../../components/abapagamento/abapagamento.jsx";
import AbaQualidadeVia from "../../components/abaqualidadevia/abaqualidadevia.jsx";
import convertFloat from "../../constants/convertfloat.js";
import { verificacaoPedagio } from "../../constants/verificacao.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createPedagioDB, getPedagioById, updatePedagioDB } from "../../SQLite/sqlitescripts.jsx";


export function CreatePedagio() {
    const navigation = useNavigation();
    const route = useRoute();
    const {viagemId, tipoDespesa, id} = route.params || {};
    const [pedagioEdit, setPedagioEdit] = useState();

    useEffect(()=>{
        async function fetchPedagio(){
           try {
             if(id){
                 const pedagioEditTemp = await getPedagioById(id);
                 setPedagioEdit(pedagioEditTemp);
                 console.log(pedagioEdit)
             }
           } catch (error) {
            console.error('Erro ao recuperar pedagio: ', error)
           }
        }
        fetchPedagio();
        
    },[id])

    const [data, setData] = useState(new Date());
    const [valor, setValor] = useState('');
    const [local, setLocal] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [comentario, setComentario] = useState('');
    const [idViagem, setIdViagem] = useState(viagemId);
    const [qualidadeDaVia, setQualidadeDaVia] = useState('');

    useEffect(()=>{
        if(pedagioEdit){
            setData(new Date(pedagioEdit.data));
            setValor(String(pedagioEdit.valor));
            setLocal(pedagioEdit.local);
            setPagamento(pedagioEdit.metodoPagamento);
            setComentario(pedagioEdit.descricao);
            setQualidadeDaVia(pedagioEdit.qualidadeDaVia);
        }
    },[pedagioEdit]);


    async function printDetail ()  {

        const numericValor = parseFloat(convertFloat(valor));

        const props = {
            valor: numericValor,
            pagamento: pagamento,
            local: local,
            qualidadeDaVia : qualidadeDaVia
        }

        if(verificacaoPedagio(props)){
            const pedagio = new Pedagio(
                formatDateToSQL(data),
                valor,
                local,
                pagamento,
                comentario,
                idViagem,
                qualidadeDaVia
            )
            
        try {
        
            if (!id) {
                await createPedagioDB({
                data: pedagio.data,
                valor: pedagio.valor,
                local: pedagio.local,
                pagamento: pedagio.pagamento,
                comentario: pedagio.comentario,
                qualidadeDaVia: pedagio.qualidadeDaVia,
                idViagem: pedagio.idViagem
                })

            } else {
                await updatePedagioDB({
                data: pedagio.data,
                valor: pedagio.valor,
                local: pedagio.local,
                pagamento: pedagio.pagamento,
                comentario: pedagio.comentario,
                qualidadeDaVia: pedagio.qualidadeDaVia,
                id: id
                })
            }

            navigation.goBack()
            
        } catch (error) {
            console.error("Erro ao inserir pedagio: ", error)
        }
        
        }else {
            console.warn('INSERÇÃO NEGADA')
            Alert.alert("! ATENÇÃO !", "Conferir as informações digitadas")
        }
    }


   return(<ScrollView automaticallyAdjustKeyboardInsets = {true}>

       <View style={styles.container}>

        <Header title="Adicionar pedágio"/>

        <View style = {styles.textFieldsContainer}>
        <DatePickerPadrao btntitle="Selecione a data" onChange={setData} date={data}/>
        <TextBox label="Valor (em Reais):" onChangeText = {setValor} value={valor}  placeholder = {'Digite o valor em R$'}/>
        <AbaPagamento onPress = {setPagamento} pagamento ={pagamento} />
        <TextBox label="Local do pedágio" onChangeText = {setLocal} value={local} placeholder = {'Digite o local'}/>
        <AbaQualidadeVia onPress ={setQualidadeDaVia} qualidadeDaVia = {qualidadeDaVia}/>
        <TextBox label="Comentários:" onChangeText = {setComentario} value={comentario}/>
        </View>

        <View style={styles.button}>
        <Button text="Salvar" onPress = {printDetail}/>
        </View>

    </View>
   </ScrollView>
    

   )
   

 
}

export default CreatePedagio;