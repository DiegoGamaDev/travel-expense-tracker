import { ScrollView, Alert, View, Text} from "react-native";
import Header from "../../components/header/header.jsx";
import styles from "./estatisticas.style";
import CardEstatistica from "../../components/cards/CardEstatisticas/cardestatisticaviagem.jsx";
import { useRoute} from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getViagemById } from "../../SQLite/sqlitescripts.jsx";
import { 
    getSomaAbastecimentoIdViagem, 
    getSomaAlimentacaoIdViagem,
    getSomaDespesaIdViagem,
    getSomaEstacionamentoIdViagem,
    getSomaHospedagemIdViagem,
    getSomaManutencaoIdViagem,
    getSomaPasseioIdViagem,
    getSomaPedagioIdViagem,
    calcularGastoTotal
    
} from "../../SQLite/sqlitescripts.jsx";

import { getAllAbastecimentoByIdViagem, getAllAlimentacaoByIdViagem, getAllDespesaByIdViagem,
    getAllDiarioByIdViagem, getAllEstacionamentoByIdViagem, getAllHospedagemByIdViagem, getAllManutencaoByIdViagem,
    getAllPasseioByIdViagem, getAllPedagioByIdViagem
 } from "../../SQLite/sqlitescripts.jsx";

function Estatisticas() {

    const route = useRoute();
    
    // ---------- FETCH GERAL DA VIAGEM -----------
    const { viagemId } = route.params || {};

    const [nome, setNome] = useState('');
    const [data, setData] = useState(null);
    const [localDePartida, setLocalDePartida] = useState('');
    const [kilometragemParcial, setKilometragemParcial] = useState(0);
    

    useEffect(() => {
        async function fetchViagem() {
            if (viagemId) {
                try {
                    const viagem = await getViagemById(viagemId);
                    if (viagem) {
                        setNome(viagem.nome);
                        setData(new Date(viagem.dataDeInicio));
                        setLocalDePartida(viagem.localDePartida);
                        setKilometragemParcial(viagem.kilometragemParcial ?? 0);
                        
                    }
                } catch (error) {
                    console.error("Erro ao carregar viagem:", error);
                    Alert.alert("Erro", "Ocorreu um erro ao carregar a viagem.");
                }
            }
        }

        fetchViagem();
    }, [viagemId]);


    // ---------- FETCH DOS GASTOS GERAIS --------------

    const [totalAbastecimento, setTotalAbastecimento] = useState(0);
    const [totalAlimentacao, setTotalAlimentacao] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [totalEstacionamento, setTotalEstacionamento] = useState(0);
    const [totalHospedagem, setTotalHospedagem] = useState(0);
    const [totalManutencao, setTotalManutencao] = useState(0);
    const [totalPasseio, setTotalPasseio] = useState(0);
    const [totalPedagio, setTotalPedagio] = useState(0);
    const [gastoTotal, setGastoTotal] = useState(0);
    const [mediaDiaria, setMediaDiaria] = useState(0);

    useEffect(()=>{
        async function fetchSomas() {
            if(viagemId){
                try {
                const abastecimento = await getSomaAbastecimentoIdViagem(viagemId);
                const alimentacao = await getSomaAlimentacaoIdViagem(viagemId);
                const despesas = await getSomaDespesaIdViagem(viagemId);
                const estacionamento = await getSomaEstacionamentoIdViagem(viagemId);
                const hospedagem = await getSomaHospedagemIdViagem(viagemId);
                const manutencao = await getSomaManutencaoIdViagem(viagemId);
                const passeio = await getSomaPasseioIdViagem(viagemId);
                const pedagio = await getSomaPedagioIdViagem(viagemId);
                const total = await calcularGastoTotal(viagemId);

                

                setTotalAbastecimento(abastecimento.total ?? 0);
                setTotalAlimentacao(alimentacao.total ?? 0);
                setTotalDespesas(despesas.total ?? 0);
                setTotalEstacionamento(estacionamento.total ?? 0);
                setTotalHospedagem(hospedagem.total ?? 0);
                setTotalManutencao(manutencao.total ?? 0);
                setTotalPasseio(passeio.total ?? 0);
                setTotalPedagio(pedagio.total ?? 0);
                setGastoTotal(total);

                
                
             
                }catch(error){
                console.error(error)
                }
            }
        }

        fetchSomas();
    },[viagemId]);

    
    useEffect(()=>{
        async function calcularMedia() {
        const viagem = await getViagemById(viagemId);
        const totalObj = await calcularGastoTotal(viagemId) ;
        const dias = calcularDiasPassados(new Date(viagem.dataDeInicio)) || 1;
        const media = totalObj / dias;
        setMediaDiaria(media);
    }
    calcularMedia();
    },[viagemId])

    
    // ---------  Calculo de dias passados - Feito com IA (Preciso estudar a manipulação de datas)

    function calcularDiasPassados(dataInicial) {
        if (!dataInicial) return 0;
        const hoje = new Date();
        const diffEmMs = hoje - dataInicial;
        return Math.max(1, Math.floor(diffEmMs / (1000 * 60 * 60 * 24)));
    }


  
    // USEI IA PARA FAZER NUM BLOCO - Preciso estudar Promisse.all 

    const [viagemData, setViagemData] = useState({
    abastecimento: [],
    alimentacao: [],
    despesa: [],
    diario: [],
    estacionamento: [],
    hospedagem: [],
    manutencao: [],
    passeio: [],
    pedagio: []
    });


useEffect(() => {
  const fetchData = async () => {
    try {
      const [
        abastecimento,
        alimentacao,
        despesa,
        diario,
        estacionamento,
        hospedagem,
        manutencao,
        passeio,
        pedagio
      ] = await Promise.all([
        getAllAbastecimentoByIdViagem(viagemId),
        getAllAlimentacaoByIdViagem(viagemId),
        getAllDespesaByIdViagem(viagemId),
        getAllDiarioByIdViagem(viagemId),
        getAllEstacionamentoByIdViagem(viagemId),
        getAllHospedagemByIdViagem(viagemId),
        getAllManutencaoByIdViagem(viagemId),
        getAllPasseioByIdViagem(viagemId),
        getAllPedagioByIdViagem(viagemId)
      ]);

      setViagemData({abastecimento,alimentacao,despesa,diario,estacionamento,
        hospedagem,manutencao,passeio,pedagio});
        

    } catch (error) {
      console.error("Erro ao buscar dados da viagem:", error);
    } 
  };

  fetchData();
}, [viagemId]);


// ---------- FETCH DADOS ABASTECIMENTO --------

const [mediaAbastecimento, setMediaAbastecimento] = useState(0);
const [litrosAbastecidos, setLitrosAbastecidos] = useState(0);
const [litroMaisCaro, setLitroMaisCaro] = useState(0);
const [localMaisCaro, setLocalMaisCaro] = useState('');
const [litroMaisBarato, setLitroMaisBarato] = useState(0);
const [localMaisBarato, setLocalMaisBarato] = useState('');
const [mediaValorPorLitro, setMediaValorPorLitro] = useState(0);


    
useEffect(() => {
  if (viagemData.abastecimento.length === 0) return;

  // Média de gasto por abastecimento
  const totalAbastecimento = viagemData.abastecimento
    .reduce((acc, a) => acc + Number(a.valor || 0), 0);
  const valormedio = totalAbastecimento / viagemData.abastecimento.length;
  setMediaAbastecimento(valormedio);

  // Total de litros abastecidos
  const litros = viagemData.abastecimento
    .reduce((acc, a) => acc + Number(a.quantidadeCombustivel || 0), 0);
  setLitrosAbastecidos(litros);

  // Litro mais caro e local 
  const maisCaro = viagemData.abastecimento.reduce((prev, curr) =>
    prev.valorPorLitro > curr.valorPorLitro ? prev : curr
  );
  setLitroMaisCaro(maisCaro.valorPorLitro);
  setLocalMaisCaro(maisCaro.local);

// Litro e local mais barato
  const maisBarato = viagemData.abastecimento.reduce((prev, curr) =>
    prev.valorPorLitro < curr.valorPorLitro ? prev : curr
    );
  
setLitroMaisBarato(maisBarato.valorPorLitro);
setLocalMaisBarato(maisBarato.local);


  // Média do valor por litro
  const mediaValorLitro = viagemData.abastecimento
    .reduce((acc, a) => acc + Number(a.valorPorLitro || 0), 0) / viagemData.abastecimento.length;
  setMediaValorPorLitro(mediaValorLitro);

 

}, [viagemData.abastecimento]);


// ---------- FECTH DADOS ALIMENTAÇÃO -----------------

const [gastoAlimentacao, setGastosAlimentacao] = useState({});
const [quantidadeAlimentacao, setQuantidadeAlimentacao] = useState({})

useEffect(()=>{

    if(viagemData.alimentacao.length == 0) return;
    const gastos = viagemData.alimentacao.reduce((acc, item) => { 
    const tipo = item.tipoAlimentacao; 
    const valor = Number(item.valor || 0); 
   
    acc[tipo] = (acc[tipo] || 0) + valor;
        
    return acc;
    
    
    },{});


    const quantidade = viagemData.alimentacao.reduce((acc, item) => {
    const tipo = item.tipoAlimentacao;
    acc[tipo] = (acc[tipo] || 0 ) + 1;
    return acc;

    },{})
    
    
    setGastosAlimentacao(gastos);
    setQuantidadeAlimentacao(quantidade)
     },[viagemData.alimentacao]);
   

// ----------- FETCH DESPESAS GERAIS ------------

const [menorDespesa, setMenorDespesa] = useState(0);
const [maiorDespesa, setMaiorDespesa] = useState(0);

useEffect(()=>{
   if(viagemData.despesa.length == 0) return;
   
   const maior = viagemData.despesa.reduce((acc, item)=> {
    const valor = Number(item.valor || 0);
    return valor > acc ? valor : acc;
   },0)


   const menor = viagemData.despesa.reduce((acc,item)=>{
    const valor = Number(item.valor || 0);
    return valor <= acc ? valor : acc


   },Number.POSITIVE_INFINITY)

   setMaiorDespesa(maior);
   setMenorDespesa(menor)

},[viagemData.despesa])



// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
    





    return (
        <View style = {styles.containerTela}>
        <Header title={'Estatísticas da viagem'} />
        <ScrollView style={styles.container}>
            <View style = {styles.containerMeio}>
            <Text style = {styles.TextMeio}> Dados gerais da viagem  </Text></View>
            

            <CardEstatistica
                itens={[
                { label: "Viagem", value: nome },
                { label: "Dias viajados", value: calcularDiasPassados(data) },
                { label: "Data de início", value: data?.toLocaleDateString() },
                { label: "Local de partida", value: localDePartida },
                { label: "Kilometragem percorrida", value: kilometragemParcial + " km" },
                ]}
            />

              <CardEstatistica
                itens = {[
                { label : 'Gasto total', value: 'R$:' + gastoTotal.toFixed(2)},
                { label : 'Média de gasto por dia', value: 'R$:' + mediaDiaria.toFixed(2)},
                { label: "Gasto em abastecimento", value: 'R$: ' + totalAbastecimento.toFixed(2)}, 
                { label: "Gasto em alimentação", value: 'R$: ' + totalAlimentacao.toFixed(2)}, 
                { label: "Outras despesas", value: 'R$: ' + totalDespesas.toFixed(2)}, 
                { label: "Gasto em estacionamento", value: 'R$: ' + totalEstacionamento.toFixed(2)}, 
                { label: "Gasto em hospedagem", value: 'R$: ' + totalHospedagem.toFixed(2)}, 
                { label: "Gasto em manutenção", value: 'R$: ' + totalManutencao.toFixed(2)}, 
                { label: "Gasto em passeio", value: 'R$: ' + totalPasseio.toFixed(2)}, 
                { label: "Gasto em pedágio", value: 'R$: ' + totalPedagio.toFixed(2)},
                ]}/>

            <View style = {styles.containerMeio}>
            <Text style = {styles.TextMeio}> Dados de abastecimento  </Text></View>

            <CardEstatistica
                itens = {[
                {label: "Quantidade de abastecimentos", value : viagemData.abastecimento.length},
                {label: "Valor médio de abastecimento", value : 'R$: ' + mediaAbastecimento.toFixed(2)},
                {label: "Quantidade de litros abastecido", value : litrosAbastecidos.toFixed(2) + 'L'},
                {label: "Valor por litro mais alto", value : 'R$: ' + litroMaisCaro.toFixed(2)},
                {label: "Local de maior valor por litro", value : localMaisCaro},
                {label: "Valor por litro mais baixo", value : 'R$: ' + litroMaisBarato.toFixed(2)},
                {label: "Local de menor valor por litro", value : localMaisBarato},
                {label: "Média de valor por litro", value : 'R$:' + mediaValorPorLitro.toFixed(2)} 
                ]}           
                />

                 <View style = {styles.containerMeio}>
                 <Text style = {styles.TextMeio}> Dados de alimentação  </Text></View>

                <CardEstatistica
                itens = {[
                {label: "Gasto total com feiras: ", value: 'R$: ' + (gastoAlimentacao.Feira ?? 0).toFixed(2) },
                {label: "Gasto total com lanchonete: ", value: 'R$: ' + (gastoAlimentacao.Lanchonete ?? 0).toFixed(2) },
                {label: "Gasto total com mercado: ", value: 'R$: ' + (gastoAlimentacao.Mercado ?? 0).toFixed(2) },
                {label: "Gasto total com padaria: ", value: 'R$: ' + (gastoAlimentacao.Padaria ?? 0).toFixed(2) },
                {label: "Gasto total com restaurante: ", value: 'R$: ' + (gastoAlimentacao.Restaurante ?? 0).toFixed(2) },
                {label: "Gasto total com vinicula: ", value: 'R$: ' + (gastoAlimentacao.Vinicula ?? 0).toFixed(2)},
                {label: "Quantidade de compras em feira ", value: quantidadeAlimentacao.Feira ?? 0},
                {label: "Quantidade de compras em lanchonete ", value: quantidadeAlimentacao.Lanchonete ?? 0},
                {label: "Quantidade de compras em mercado ", value: quantidadeAlimentacao.Mercado ?? 0},
                {label: "Quantidade de compras em padaria ", value: quantidadeAlimentacao.Padaria ?? 0},
                {label: "Quantidade de compras em restaurante ", value: quantidadeAlimentacao.Restaurante ?? 0},
                {label: "Quantidade de compras em vinícula ", value: quantidadeAlimentacao.Vinicula ?? 0},
                ]}
                />


                <View style = {styles.containerMeio}>
                <Text style = {styles.TextMeio}> Dados de despesas gerais  </Text></View>

                <CardEstatistica
                itens = {[
                {label: "Quantidade de despesas extras", value: viagemData.despesa.length ?? 0},   
                {label: "Despesa extra de maior valor", value: 'R$: ' + (maiorDespesa ?? 0).toFixed(2)},   
                {label: "Despesa extra de menor valor", value: 'R$: ' + (menorDespesa ?? 0).toFixed(2)}   
                ]}
                />
          

        </ScrollView>
        </View>


        
    );
}

export default Estatisticas;
