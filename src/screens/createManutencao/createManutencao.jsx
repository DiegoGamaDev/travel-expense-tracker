import Header from "../../components/header/header.jsx";
import {TextBox} from "../../components/textBox/textbox.jsx"
import Button from "../../components/button/button.jsx";
import styles from "./createManutencao.style.js"
import { ScrollView, View } from "react-native";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import formatDate from "../../constants/dateformat.js";
import { Manutencao } from "../../entities/manutencao.js";
import { useState, useEffect } from "react";
import AbaPagamento from "../../components/abapagamento/abapagamento.jsx";
import { verificacaoManutencao } from "../../constants/verificacao.js";
import { Alert } from "react-native";
import convertFloat from "../../constants/convertfloat.js";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatDateToSQL } from "../../constants/dateformat.js";
import { createManutencaoDB, getManutencaoById, updateManutencaoDB } from "../../SQLite/sqlitescripts.jsx";

export function CreateManutencao() {
    const navigation = useNavigation();
    const route = useRoute();
    const { viagemId, tipoDespesa, id } = route.params || {};
    const [manutencaoEdit, setManutencaoEdit] = useState();

    useEffect(()=>{
        async function fetchManutencao(){
            if(id){

                try{
                    const manutencaoEditTemp = await getManutencaoById(id)
                    setManutencaoEdit(manutencaoEditTemp);
                    if (manutencaoEdit) {
                        console.log('Manutencao edit carregada com sucesso.')
                    }
                }catch(error){
                    console.log('Erro ao carregar manutencao: ', error)
                }
            }
        }
        fetchManutencao();
    },[id])


    const [data, setData] = useState(new Date());
    const [valor, setValor] = useState('');
    const [tipoManutencao, setTipoManutencao] = useState('');
    const [local, setLocal] = useState('');
    const [pagamento, setPagamento] = useState('');
    const [comentario, setComentario] = useState('');
    const [idViagem, setIdViagem] = useState(viagemId ? viagemId : 0);

    useEffect(()=>{
        if(manutencaoEdit){
            setData(new Date(manutencaoEdit.data));
            setValor(String(manutencaoEdit.valor));
            setTipoManutencao(String(manutencaoEdit.tipoDeManutencao));
            setLocal(String(manutencaoEdit.local));
            setPagamento(String(manutencaoEdit.metodoPagamento));
            setComentario(String(manutencaoEdit.descricao));
        }
    },[manutencaoEdit]);

    async function printDetail  () {
      
        const numericValor = parseFloat(convertFloat(valor)) || 0;
        
        const props = {
            valor: numericValor,
            local : local,
            pagamento : pagamento,
            tipoManutencao : tipoManutencao
        }

        if(verificacaoManutencao(props)){
            const manutencao  = new Manutencao(
                formatDateToSQL(data),
                numericValor,
                local,
                pagamento,
                comentario,
                tipoManutencao,
                idViagem
            );
            
        try  {
        
      if (!id) {
          await createManutencaoDB({
          data: manutencao.data,
          valor: manutencao.valor,
          local: manutencao.local,
          pagamento: manutencao.pagamento,
          comentario: manutencao.comentario,
          tipoDeManutencao: manutencao.tipoDeManutencao,
          idViagem: manutencao.idViagem
          })
          console.log('Manutencao inserida com sucesso.')
      } else {
        await updateManutencaoDB({
            data: manutencao.data,
            valor: manutencao.valor,
            local: manutencao.local,
            pagamento: manutencao.pagamento,
            comentario: manutencao.comentario,
            tipoDeManutencao: manutencao.tipoDeManutencao,
            id: id
        })
        console.log('Manutencao salva com sucesso.')
      }
        navigation.goBack()
        
        } catch (error) {
            console.error('Erro ao inserir manutencao: ', error)
        }
            
        }else{
            console.warn('INSERÇÃO NEGADA')
            Alert.alert("! ATENÇÃO !", "Conferir as informações digitadas")
        }

    };

    return(<ScrollView automaticallyAdjustKeyboardInsets = {true} >

       <View style={styles.container}>

        <Header title="Adicionar manutenção"/>

        <View style = {styles.textFieldsContainer}>
        <DatePickerPadrao btntitle="Selecione a data da manutenção" onChange={setData} date ={data}/>
        <TextBox label="Valor total (em Reais):" onChangeText = {setValor} value = {valor}/>
        <AbaPagamento onPress={setPagamento} pagamento ={pagamento}/>
        <TextBox label="Local:" onChangeText = {setLocal} value = {local}/>
        <TextBox label="Tipo de manutenção:" onChangeText = {setTipoManutencao} value = {tipoManutencao}/>
        <TextBox label="Comentários:" onChangeText = {setComentario} value = {comentario}/>
        </View>

        <View style={styles.button}>
        <Button text="Salvar" onPress = {printDetail}/>
        </View>

    </View>
   </ScrollView>
    

   )
   

 
}

export default CreateManutencao;