import React, { useState, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import Header from "../../components/header/header.jsx";
import { TextBox } from "../../components/textBox/textbox.jsx";
import Button from "../../components/button/button.jsx";
import styles from "./createAbastecimento.style.js";
import { DatePickerPadrao } from "../../components/datePicker/datepicker.jsx";
import { Abastecimento } from "../../entities/abastecimento.js";
import { formatDateToSQL } from "../../constants/dateformat.js";
import convertFloat from "../../constants/convertfloat.js";
import AbaPagamento from "../../components/abapagamento/abapagamento.jsx";
import { verificacaoAbastecimento } from "../../constants/verificacao.js";
import { createAbastecimentoDB, getAbastecimentoById, updateAbastecimentoDB } from "../../SQLite/sqlitescripts.jsx";
import { useNavigation, useRoute } from "@react-navigation/native";

export function atualizarRodagem(){

    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params || {};
    const [rodagem, setRodagem] = useState(null);

    useEffect(() => {
        // Obtém valores da rota
        const { kilometragemParcial, kilometragemInicial } = route.params || {};
        // Se `kilometragemParcial` for válido, usa ele. Senão, usa `kilometragemInicial`
        setRodagem(kilometragemParcial ?? kilometragemInicial);
    }, [route.params]);

    
    useEffect(() => {
        async function fetchRodagem() {
            if (id) {
                try {
                    const abastecimentoEditTemp = await getAbastecimentoById(id);
                    setAbastecimentoEdit(abastecimentoEditTemp);
                    console.log('Abastecimento edit carregado com sucesso.');
                } catch (error) {
                    console.error("Erro ao carregar abastecimento:", error);
                }
            } 
        }
        fetchfetchRodagem();
    }, [id]);


};


export default atualizarRodagem;