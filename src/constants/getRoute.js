
import React from "react";

export function getRoutes(icon){

    switch(icon){

        case('abastecimento'):
            return 'createAbastecimento' ;
            
        case('alimentacao'):
            return 'createAlimentacao' ;
       
        case('despesa'):
            return 'createDespesa' ;
            
        case('diario'):
            return 'createDiario' ;

        case('estacionamento'):
            return 'createEstacionamento';
            
        case('hospedagem'):
            return 'createHospedagem' ;

        case('manutencao'):
            return 'createManutencao' ;
            
        case('passeio'):
            return 'createPasseio' ;

        case('pedagio'):
            return 'createPedagio' ;
            

    }


}
