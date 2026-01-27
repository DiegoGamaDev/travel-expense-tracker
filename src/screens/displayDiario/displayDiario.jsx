import React, { useEffect, useState, useCallback } from "react";
import styles from "./displayDiario.style.js";
import { CardDiario } from "../../components/cards/CardDiario/carddiario.jsx";
import { View, Alert, Image, FlatList, TouchableOpacity } from "react-native";
import Header from "../../components/header/header.jsx";
import FloatActionButton from "../../components/fab/fab.jsx";
import { getAllDiarioByIdViagem, deleteByTableId } from "../../SQLite/sqlitescripts.jsx";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { getRoutes } from "../../constants/getRoute.js";
import { formatDateReadSQL } from "../../constants/dateformat.js";
import { Diario } from "../../entities/diario.js";
import { SearchBox } from "../../components/searchbox/searchbox.jsx";
import icons from "../../constants/icons.js";

export function DisplayDiario(props) {
    const route = useRoute();

    const { viagemId } = route.params || {};
    const [listaDiario, setListaDiario] = useState([]);
    const [filteredListaDiario, setFilteredListaDiario] = useState([]);
    const [search, setSearch] = useState('');
    const [filterFav, setFilterFav] = useState(false);

    const loadListaDiario = async () => {
        try {
            const listaDiarioSQL = await getAllDiarioByIdViagem(viagemId);
            setListaDiario(listaDiarioSQL);
        } catch (error) {
            console.error('Erro ao carregar diários: ', error);
            Alert.alert('Erro', 'Não foi possível carregar os diários. Tente novamente.');
        }
    };

    useEffect(() => {
        // Combinação de filtros (Favoritos e Busca)
        let filtered = listaDiario;

        if (filterFav) {
            filtered = filtered.filter(item => item.favorito);
        }

        if (search.trim()) {
            const searchTerm = search.toLowerCase();
            filtered = filtered.filter(item =>
                item.local?.toLowerCase().includes(searchTerm) ||
                item.comentario?.toLowerCase().includes(searchTerm)
            );
        }

        setFilteredListaDiario(filtered);
    }, [filterFav, search, listaDiario]);

    useEffect(() => {
        loadListaDiario();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadListaDiario();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Header title={'Diários'} />

            <View style={styles.searchContainer}>
                <SearchBox
                    placeholder={'Digite o que busca...'}
                    onChangeText={setSearch}
                    value={search}
                />
                <TouchableOpacity
                    onPress={() => setFilterFav(!filterFav)}
                    style={styles.iconContainer}
                >
                    <Image
                        source={filterFav ? icons.iconFavTrue : icons.iconFavFalse}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredListaDiario.slice().reverse()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.datacontainer}>
                        <CardDiario
                            data={formatDateReadSQL(item.data)}
                            source={item.favorito ? icons.iconFavTrue : icons.iconFavFalse}
                            local={item.local}
                            comentario={item.comentario}
                            id={item.id}
                            onPress={() => {
                                const routeName = getRoutes('diario');
                                if (routeName) {
                                    props.navigation.navigate(routeName, { id: item.id });
                                }
                            }}
                            onLongPress={() => {
                                Alert.alert(
                                    'Detalhes',
                                    ShowDiario(item),
                                    [
                                        { text: 'Fechar', style: 'cancel' },
                                        {
                                            text: 'Delete',
                                            style: 'destructive',
                                            onPress: () => {
                                                Alert.alert(
                                                    'Confirmar Exclusão',
                                                    'Você tem certeza que deseja deletar esta entrada?',
                                                    [
                                                        { text: 'Cancelar', style: 'cancel' },
                                                        {
                                                            text: 'SIM',
                                                            style: 'destructive',
                                                            onPress: async () => {
                                                                try {
                                                                    await deleteByTableId({ table: 'diario', id: item.id });
                                                                    loadListaDiario();
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
                const routeName = getRoutes('diario');
                if (routeName) {
                    props.navigation.navigate(routeName, { viagemId });
                }
            }} />
        </View>
    );
}

function ShowDiario(item) {
    const diario = new Diario(
        formatDateReadSQL(item.data),
        item.local,
        item.comentario,
        item.idViagem
    );
    return diario.toString();
}

export default DisplayDiario;
