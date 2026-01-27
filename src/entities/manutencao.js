import { formatDateReadSQL } from "../constants/dateformat";
import { Despesa } from "./despesa";

export class Manutencao extends Despesa {

    #tipoDeManutencao

    constructor ( data, valor, local, pagamento, comentario, tipoManutencao, idViagem){
        super(data,valor,local,pagamento,comentario,idViagem)
        this.#tipoDeManutencao = tipoManutencao
    }

    get tipoDeManutencao(){
        return this.#tipoDeManutencao
    }

    set tipoDeManutencao(value){
        this.#tipoDeManutencao = value
    }
    
    toString() {
        return (
            "Manutenção:  \n" +
            "Data: " + formatDateReadSQL(this.data) + "\n" +
            "Valor R$:" + this.valor.toFixed(2) + "\n" +
            "Método de pagamento: " + this.pagamento + "\n" +
            "Local: " + this.local + "\n" +
            "Tipo de Manutenção: " + this.tipoDeManutencao + "\n" +
            "Descrição: " + this.comentario + "\n" 
        );
    }

}