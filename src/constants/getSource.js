import icons from "./icons";
import React from "react";

export function getSource(icon){

    switch(icon){

        case('abastecimento'):
            return icons.icnAbastecimento;
            
        case('alimentacao'):
            return icons.icnAlimentacao;
       
        case('despesa'):
            return icons.icnDespesas;
            
        case('diario'):
            return icons.icnDiario;

        case('estacionamento'):
            return icons.icnEstacionamento;
            
        case('hospedagem'):
            return icons.icnHospedagem

        case('manutencao'):
            return icons.icnManutencao;
            
        case('passeio'):
            return icons.icnPasseio

        case('pedagio'):
            return icons.icnPedagio;
            

    }


}
