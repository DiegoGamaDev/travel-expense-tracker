import { View, Alert } from "react-native";
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
    getSomaPedagioIdViagem
    
} from "../../SQLite/sqlitescripts.jsx";

function Estatisticas() {

    const route = useRoute();
    
    // ---------- FETCH DO PRIMEIRO CONTAINER -----------
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
    const [mediaDiaria, setTotalMediaDiaria] = useState(0);

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


                setTotalAbastecimento(abastecimento.total ?? 0);
                setTotalAlimentacao(alimentacao.total ?? 0);
                setTotalDespesas(despesas.total ?? 0);
                setTotalEstacionamento(estacionamento.total ?? 0);
                setTotalHospedagem(hospedagem.total ?? 0);
                setTotalManutencao(manutencao.total ?? 0);
                setTotalPasseio(passeio.total ?? 0);
                setTotalPedagio(pedagio.total ?? 0);

                


                   

                }catch(error){
                console.error(error)
                }
            }
        }


        fetchSomas();

    }
    
    
    ,[viagemId]); 
    

    function calcularDiasPassados(dataInicial) {
        if (!dataInicial) return 0;
        const hoje = new Date();
        const diffEmMs = hoje - dataInicial;
        return Math.floor(diffEmMs / (1000 * 60 * 60 * 24));
    }

    return (
        <View style={styles.container}>
            <Header title={'Estatísticas da viagem'} />

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
                    { label: "Gasto em abastecimento", value: 'R$: ' + totalAbastecimento.toFixed(2)}, 
                    { label: "Gasto em alimentação", value: 'R$: ' + totalAlimentacao.toFixed(2)}, 
                    { label: "Outras despesas", value: 'R$: ' + totalDespesas.toFixed(2)}, 
                    { label: "Gasto em estacionamento", value: 'R$: ' + totalEstacionamento.toFixed(2)}, 
                    { label: "Gasto em hospedagem", value: 'R$: ' + totalHospedagem.toFixed(2)}, 
                    { label: "Gasto em manutenção", value: 'R$: ' + totalManutencao.toFixed(2)}, 
                    { label: "Gasto em passeio", value: 'R$: ' + totalPasseio.toFixed(2)}, 
                    { label: "Gasto em pedágio", value: 'R$: ' + totalPedagio.toFixed(2)},
                ]}/>
          

        </View>


        
    );
}

export default Estatisticas;
