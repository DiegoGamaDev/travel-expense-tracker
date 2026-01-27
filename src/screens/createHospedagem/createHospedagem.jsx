import Header from "../../components/header/header.jsx";
import {TextBox} from "../../components/textBox/textbox.jsx"
import Button from "../../components/button/button.jsx";
import styles from "./createHospedagem.style.js"
import { ScrollView, View } from "react-native";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import { useState, useEffect } from "react";
import { Hospedagem } from "../../entities/hospedagem.js";
import DropDownPadrao from "../../components/dropdownpadrao/dropdownpadrao.jsx";
import { tiposHospedagem } from "../../constants/dropdownitems.js";
import convertFloat from "../../constants/convertfloat.js";
import AbaPagamento from "../../components/abapagamento/abapagamento.jsx";
import { verificacaoHospedagem } from "../../constants/verificacao.js";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatDateToSQL } from "../../constants/dateformat.js";
import { createHospedagemDB, getHospedagemById, updateHospedagemDB } from "../../SQLite/sqlitescripts.jsx";

export function CreateHospedagem() {
    const navigation = useNavigation();
    const route = useRoute();
    const { viagemId, tipoDespesa, id } = route.params || {};
    const [hospedagemEdit, setHospedagemEdit] = useState();

    useEffect(()=> {
        async function fetchHospedagem() {
            if(id){
                try{
                const hospedagemEditTemp = await getHospedagemById(id);
                setHospedagemEdit(hospedagemEditTemp);
                console.log('Hospedagem edit carregada com sucesso: ', hospedagemEdit)
                } catch(error){
                    console.log('Erro ao carregar hospedagem.')
                }
            }
        }
        fetchHospedagem();
    },[id]);

    const [data, setData] = useState(new Date());
    const [valor, setValor] = useState('');
    const [local, setLocal] = useState('');
    const [tipoHospedagem, setTipoHospedagem] = useState('');
    const [quantidadeDiarias, setQuantidadeDiarias] = useState ('');
    const [nomeHospedagem, setNomeHospedagem] = useState ('');
    const [pagamento, setPagamento] = useState('');
    const [comentario, setComentario] = useState('');
    const [idViagem, setIdViagem] = useState(viagemId ? viagemId : 0);

    useEffect(()=>{
        if(hospedagemEdit){
            setData(new Date(hospedagemEdit.data));
            setValor(String(hospedagemEdit.valor));
            setLocal(String(hospedagemEdit.local));
            setTipoHospedagem(String(hospedagemEdit.tipoHospedagem));
            setQuantidadeDiarias(String(hospedagemEdit.quantidadeDeDiarias));
            setNomeHospedagem(hospedagemEdit.nomeHospedagem);
            setPagamento(hospedagemEdit.metodoPagamento);
            setComentario(hospedagemEdit.descricao);
        }
    },[hospedagemEdit])

    async function printDetail (){

            const numericValor = parseFloat(convertFloat(valor,setValor)) || 0;
            const numericQuantidadeDiarias = parseFloat(convertFloat(quantidadeDiarias,setQuantidadeDiarias)) || 0;

            
            const props = {     

                valor : numericValor, 
                local: local, 
                pagamento: pagamento, 
                nomeHospedagem: nomeHospedagem, 
                tipoHospedagem: tipoHospedagem, 
                quantidadeDiarias: numericQuantidadeDiarias
            }


        if(verificacaoHospedagem(props)){
            
            const hospedagem = new Hospedagem(
                formatDateToSQL(data),
                numericValor,
                local,
                pagamento,
                comentario,
                tipoHospedagem,
                numericQuantidadeDiarias,
                nomeHospedagem,
                idViagem
        );
        

        try {

           if (!id) {
             
             await createHospedagemDB({
             data: hospedagem.data,
             valor: hospedagem.valor,
             local: hospedagem.local,
             pagamento: hospedagem.pagamento,
             comentario: hospedagem.comentario,
             tipoHospedagem: hospedagem.tipoHospedagem,
             quantidadeDeDiarias: hospedagem.quantidadeDiarias,
             nomeHospedagem: hospedagem.nomeHospedagem,
             idViagem: hospedagem.idViagem
             })
           } else {

            await updateHospedagemDB({
                data: hospedagem.data,
                valor: hospedagem.valor,
                local: hospedagem.local,
                pagamento: hospedagem.pagamento,
                comentario: hospedagem.comentario,
                tipoHospedagem: hospedagem.tipoHospedagem,
                quantidadeDeDiarias: hospedagem.quantidadeDiarias,
                nomeHospedagem: hospedagem.nomeHospedagem,
                id: id
            })
            

           }

            navigation.goBack()

        } catch (error) {
            console.error('Erro ao inserir hospedagem: ', error)
        }
        
        } else {
            console.warn('INSERÇÃO NEGADA')
            Alert.alert("! ATENÇÃO !", "Conferir as informações digitadas")
        }


    }

   return(<ScrollView automaticallyAdjustKeyboardInsets = {true}>

       <View style={styles.container}>

        <Header title="Adicionar hospedagem"/>

        <View style = {styles.textFieldsContainer}>
        <DatePickerPadrao 
        btntitle="Selecione a data da hospedagem"
        onChange={setData}
        date = {data}
        />
        
        <TextBox
         label="Valor total (em Reais):" 
         onChangeText = {setValor} 
         value = {valor}
         placeholder = {'Digite o valor em R$'}
         />

         <AbaPagamento
            onPress = {setPagamento}
            pagamento = {pagamento}
         />

        <TextBox 
        label="Nome da hospedagem:" 
        onChangeText = {setNomeHospedagem} 
        value = {nomeHospedagem}
        placeholder = {'Digite o nome do local'}
        />

        <TextBox 
        label="Local de hospedagem:" 
        onChangeText = {setLocal} 
        value = {local}
        placeholder = {'Digite o local de hospedagem'}
        />

        <DropDownPadrao
        items={tiposHospedagem}
        valorInicial={tipoHospedagem}
        label={'Tipo de hospedagem:'}
        onValueChange={setTipoHospedagem}
        placeholder="Selecione o tipo de hospedagem"
        />

        <TextBox 
        label="Quantidade de diarias:" 
        onChangeText = {setQuantidadeDiarias} 
        value = {quantidadeDiarias}
        placeholder = {'Digite a quantidade de diarias'}
        />

        <TextBox 
        label="Comentários:" 
        onChangeText = {setComentario} 
        value = {comentario}/>

        </View>

        <View style={styles.button}>
        <Button text="Salvar" onPress = {printDetail}/>
        </View>

    </View>
   </ScrollView>
    

   )
   

 
}

export default CreateHospedagem;