import Header from "../../components/header/header.jsx";
import { TextBox, TextBoxDiario } from "../../components/textBox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import styles from "./createDiario.style.js";
import { Alert, ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import { Diario } from "../../entities/diario.js";
import { useState, useEffect } from "react";
import { formatDateToSQL } from "../../constants/dateformat.js";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { createDiarioDB, getDiarioById, updateDiarioDB } from "../../SQLite/sqlitescripts.jsx";
import icons from "../../constants/icons.js";

export function CreateDiario() {
    const route = useRoute();
    const navigation = useNavigation();
    const { viagemId, id } = route.params || {};
    const [data, setData] = useState(new Date());
    const [local, setLocal] = useState('');
    const [comentario, setComentario] = useState('');
    const [diarioEdit, setDiarioEdit] = useState();
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        async function fetchDiario() {
            if (id) {
                try {
                    const diarioEditTemp = await getDiarioById(id);
                    setDiarioEdit(diarioEditTemp);
                    console.log('Diário carregado com sucesso.');
                } catch (error) {
                    console.error('Erro ao carregar diário: ', error);
                }
            }
        }
        fetchDiario();
    }, [id]);

    useEffect(() => {
        if (diarioEdit) {
            setData(new Date(diarioEdit.data));
            setLocal(String(diarioEdit.local));
            setComentario(String(diarioEdit.comentario));
            setFavorito(diarioEdit.favorito);
        }
    }, [diarioEdit]);

    async function printDetail() {
        if (local !== '' || comentario !== '') {
            const diario = new Diario(
                formatDateToSQL(data),
                local,
                comentario,
                favorito
            );

            try {
                if (!id) {
                    await createDiarioDB({
                        data: diario.data,
                        local: diario.local,
                        comentario: diario.comentario,
                        favorito: favorito,
                        idViagem: viagemId
                    });
                } else {
                   try {
                     await updateDiarioDB({
                         data: diario.data,
                         local: diario.local,
                         comentario: diario.comentario,
                         favorito: favorito,
                         id: id
                     });
                   } catch (error) {
                    console.error(error)
                   }
                }
                navigation.goBack();
            } catch (error) {
                Alert.alert("Erro", "Houve um erro ao salvar o diário.");
                console.error('Erro ao salvar o diário: ', error);
            }
        } else {
            Alert.alert("! Aviso !", "Verificar os campos digitados");
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Header title="Adicionar entrada no diário" />

                <View style={styles.textFieldsContainer}>
                    <DatePickerPadrao
                        btntitle="Selecione a data"
                        onChange={setData}
                        date={data}
                    />
                    <TextBox
                        label="Local:"
                        onChangeText={setLocal}
                        value={local}
                    />
                    <TextBoxDiario
                        label="Comentário:"
                        onChangeText={setComentario}
                        value={comentario}
                        multiline
                    />
                </View>

                <View style={styles.containerFavorito}>
                    <Text style={styles.text}>Adicionar como favorito?</Text>
                    <TouchableOpacity onPress={() => { setFavorito(!favorito); }}>
                        <Image style={styles.logo} source={favorito ? icons.iconFavTrue : icons.iconFavFalse} />
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <Button text="Salvar" onPress={printDetail} />
                </View>
            </View>
        </ScrollView>
    );
}

export default CreateDiario;
