import React, { useEffect, useState, useCallback } from "react";
import styles from "./displayDespesas.style.js";
import { CardDespesa } from "../../components/cards/CardDespesa/carddespesa.jsx";
import { View, Alert, FlatList } from "react-native";
import Header from "../../components/header/header.jsx";
import DespesaInfo from "../../components/despesainfo/despesainfo.jsx";
import FloatActionButton from "../../components/fab/fab.jsx";
import { 
    getAllAbastecimentoByIdViagem, getSomaAbastecimentoIdViagem, 
    getAllAlimentacaoByIdViagem, getSomaAlimentacaoIdViagem,
    getAllDespesaByIdViagem, getSomaDespesaIdViagem,
    getAllEstacionamentoByIdViagem, getSomaEstacionamentoIdViagem,
    getAllHospedagemByIdViagem, getSomaHospedagemIdViagem,
    getAllManutencaoByIdViagem, getSomaManutencaoIdViagem,
    getAllPasseioByIdViagem, getSomaPasseioIdViagem,
    getAllPedagioByIdViagem, getSomaPedagioIdViagem,
    deleteByTableId
} from "../../SQLite/sqlitescripts.jsx";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { getSource } from "../../constants/getSource.js";
import { getRoutes } from "../../constants/getRoute.js";
import { formatDateReadSQL } from "../../constants/dateformat.js";
import { ShowDetails } from "../../constants/showdetails.js";
import { SearchBox } from "../../components/searchbox/searchbox.jsx";

export function DisplayDespesas(props) {
    const route = useRoute();
    const { viagemId, tipoDespesa } = route.params || {};
    const [gastoTotalDespesa, setGastoTotalDespesa] = useState(0);
    const [listaDespesa, setListaDespesa] = useState([]);
    const [filteredListaDespesa, setFilteredListaDespesa] = useState([]);
    const [source, setSource] = useState('');
    const [search, setSearch] = useState('');

    const loadListaDespesas = async () => {
        try {
            let listaAtualizada;
            let despesaAtualizada;

            switch (tipoDespesa) {
                case 'abastecimento':
                    listaAtualizada = await getAllAbastecimentoByIdViagem(viagemId);
                    despesaAtualizada = await getSomaAbastecimentoIdViagem(viagemId);
                    break;
                case 'alimentacao':
                    listaAtualizada = await getAllAlimentacaoByIdViagem(viagemId);
                    despesaAtualizada = await getSomaAlimentacaoIdViagem(viagemId);
                    break;
                case 'despesa':
                    listaAtualizada = await getAllDespesaByIdViagem(viagemId);
                    despesaAtualizada = await getSomaDespesaIdViagem(viagemId);
                    break;
                case 'estacionamento':
                    listaAtualizada = await getAllEstacionamentoByIdViagem(viagemId);
                    despesaAtualizada = await getSomaEstacionamentoIdViagem(viagemId);
                    break;
                case 'hospedagem':
                    listaAtualizada = await getAllHospedagemByIdViagem(viagemId);
                    despesaAtualizada = await getSomaHospedagemIdViagem(viagemId);
                    break;
                case 'manutencao':
                    listaAtualizada = await getAllManutencaoByIdViagem(viagemId);
                    despesaAtualizada = await getSomaManutencaoIdViagem(viagemId);
                    break;
                case 'passeio':
                    listaAtualizada = await getAllPasseioByIdViagem(viagemId);
                    despesaAtualizada = await getSomaPasseioIdViagem(viagemId);
                    break;
                case 'pedagio':
                    listaAtualizada = await getAllPedagioByIdViagem(viagemId);
                    despesaAtualizada = await getSomaPedagioIdViagem(viagemId);
                    break;
                default:
                    Alert.alert('Tipo de despesa não suportado');
                    return;
            }

            setListaDespesa(listaAtualizada);
            setFilteredListaDespesa(listaAtualizada); 
            setGastoTotalDespesa(despesaAtualizada.total);
            setSource(getSource(tipoDespesa));

        } catch (error) {
            console.error('Erro ao carregar despesas: ', error);
            Alert.alert('Erro ao carregar despesas', 'Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        loadListaDespesas();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadListaDespesas();
        }, [])
    );

    useEffect(() => {
        const filtered = listaDespesa.filter(item => {
            const searchTerm = search.toLowerCase();
            const localMatches = item.local?.toLowerCase().includes(searchTerm);
            const descricaoMatches = item.descricao?.toLowerCase().includes(searchTerm);
            const valorMatches = item.valor?.toString().toLowerCase().includes(searchTerm);
            return localMatches || descricaoMatches || valorMatches;
        });
        setFilteredListaDespesa(filtered);
    }, [search, listaDespesa]); 

    return (
        <View style={styles.container}>
            <Header title={tipoDespesa.toUpperCase()} />
            <DespesaInfo tipoDespesa={tipoDespesa} valor={gastoTotalDespesa ? gastoTotalDespesa.toFixed(2) : '0.00'} />
           
            <SearchBox
                placeholder={'Digite o que busca...'}
                onChangeText={setSearch} 
                value={search} 
            />

            <FlatList
                data={filteredListaDespesa.slice().reverse()} 
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => (
                    <View style={styles.datacontainer}>
                        <CardDespesa
                            data={formatDateReadSQL(item.data)}
                            source={source}
                            local={item.local}
                            valor={item.valor}
                            valorLitro={item.valorPorLitro ? `Valor por litro R$: ${item.valorPorLitro.toFixed(2)}` : ''}
                            comentario={item.descricao}
                            id={item.id}
                            onPress={() => {
                                const routeName = getRoutes(tipoDespesa);
                                if (routeName) {
                                    props.navigation.navigate(routeName, { id: item.id });
                                } else {
                                    console.error('Rota não encontrada!');
                                }
                            }} 
                            onLongPress={() => {
                                Alert.alert(
                                    'Detalhes',
                                    ShowDetails(item),
                                    [
                                        { text: 'Fechar', style: 'cancel' },
                                        {
                                            text: 'Delete',
                                            style: 'destructive',
                                            onPress: () => {
                                                Alert.alert(
                                                    'Confirmar Exclusão',
                                                    'Você tem certeza que deseja deletar esta despesa?',
                                                    [
                                                        { text: 'Cancelar', style: 'cancel' },
                                                        {
                                                            text: 'SIM',
                                                            style: 'destructive',
                                                            onPress: async () => {
                                                                try {
                                                                    await deleteByTableId({ table: item.categoria, id: item.id });
                                                                    loadListaDespesas();
                                                                } catch (error) {
                                                                    console.error('Erro ao deletar: ', error);
                                                                }
                                                            },
                                                        },
                                                    ],
                                                    { cancelable: true }
                                                );
                                            },
                                        },
                                    ],
                                    { cancelable: true }
                                );
                            }}
                        />
                    </View> 
                )}
            />

            <FloatActionButton onPress={() => {
                const routeName = getRoutes(tipoDespesa);
                if (routeName) {
                    props.navigation.navigate(routeName, { viagemId });
                } else {
                    console.error('Rota não encontrada!');
                }
            }} />
        </View>
    );
}

export default DisplayDespesas;
