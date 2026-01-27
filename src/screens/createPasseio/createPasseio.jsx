import Header from "../../components/header/header.jsx";
import {TextBox} from "../../components/textBox/textbox.jsx"
import Button from "../../components/button/button.jsx";
import styles from "./createPasseio.style.js"
import { Alert, ScrollView, View } from "react-native";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import { useState, useEffect } from "react";
import { Passeio } from "../../entities/passeio.js";
import formatDate from "../../constants/dateformat.js";
import AbaPagamento from "../../components/abapagamento/abapagamento.jsx";
import convertFloat from "../../constants/convertfloat.js";
import { verificacaoPasseio } from "../../constants/verificacao.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatDateToSQL } from "../../constants/dateformat.js";
import { createPasseioDB, getPasseioById, updatePasseioDB } from "../../SQLite/sqlitescripts.jsx";

export function CreatePasseio() {
    const navigation = useNavigation();
    const route = useRoute();
    const { viagemId, tipoDespesa, id } = route.params || {};
    const [passeioEdit, setPasseioEdit] = useState();

    useEffect(()=>{
     async function fetchPasseio() {
        if(id){
            try {
            const passeioEditTemp = await getPasseioById(id)
            setPasseioEdit(passeioEditTemp);
            if(passeioEdit){
                console.log(passeioEdit)
            }
            } catch (error) {
                console.error('Erro ao ler passeio: ', error)
            }
        }
     }

     fetchPasseio();
    },[id])

    const [data, setData] = useState(new Date());
    const [valor, setValor] = useState('');
    const [local, setLocal] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [comentario, setComentario] = useState('');
    const [idViagem, setIdViagem] = useState(viagemId ? viagemId : 0);
    const [nomePasseio, setNomePasseio] = useState('');


    useEffect(()=>{
        if(passeioEdit){
            
            setData(new Date(passeioEdit.data));
       
            setValor(String(passeioEdit.valor));
            
            setLocal(String(passeioEdit.local));
         
            setPagamento(String(passeioEdit.metodoPagamento));
        
            setComentario(String(passeioEdit.descricao));
           
            setNomePasseio(String(passeioEdit.nomePasseio));

        }

        
    },[passeioEdit])


    async function printDetail () {

        const numericValor = parseFloat(convertFloat(valor));

        const props = {
            valor: numericValor,
            pagamento: pagamento,
            local: local,
            nomePasseio: nomePasseio
        }

       if(verificacaoPasseio(props)){
        const passeio = new Passeio(
            formatDateToSQL(data),
            valor,
            local,
            pagamento,
            comentario,
            idViagem,
            nomePasseio
        );

       try {
        
        if (!id) {
    
           await createPasseioDB({
            data: passeio.data, 
            valor: passeio.valor,
            local: passeio.local,
            pagamento: passeio.pagamento,
            comentario: passeio.comentario,
            idViagem: passeio.idViagem,
            nomePasseio: passeio.nomePasseio
           }) 
    
            } else {

            await updatePasseioDB({
            data: passeio.data, 
            valor: passeio.valor,
            local: passeio.local,
            pagamento: passeio.pagamento,
            comentario: passeio.comentario,
            nomePasseio: passeio.nomePasseio,
            id: id
            })
            }

       navigation.goBack()

       } catch (error) {
        console.log('Erro ao inserir passeio: ', error)
       } 

       }else{
        console.warn("ERRO AO INSERIR")
        Alert.alert("! ALERTA !", "Conferir os dados digitados")
       }

    }

   return(<ScrollView automaticallyAdjustKeyboardInsets = {true}>

       <View style={styles.container}>

        <Header title="Adicionar passeio"/>

        <View style = {styles.textFieldsContainer}>
        <DatePickerPadrao btntitle="Selecione a data do passeio" onChange={setData} date = {data}/>
        <TextBox label="Valor total (em Reais):" onChangeText = {setValor} value={valor} placeholder = {'Digite o valor em R$'}/>
        <AbaPagamento onPress = {setPagamento} pagamento ={pagamento}/>
        <TextBox label="Local do passeio:" onChangeText = {setLocal} value={local} placeholder = {'Digite o local'}/>
        <TextBox label="Nome do passeio:" onChangeText = {setNomePasseio} value={nomePasseio} placeholder = {'Digite um nome para o passeio'}/>
        <TextBox label="Comentários:" onChangeText = {setComentario} value={comentario}/>
        </View>

        <View style={styles.button}>
        <Button text="Salvar" onPress = {printDetail}/>
        </View>

    </View>
   </ScrollView>
    

   )
   

 
}

export default CreatePasseio;