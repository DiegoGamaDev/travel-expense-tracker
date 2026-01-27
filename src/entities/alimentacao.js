import { formatDateReadSQL } from "../constants/dateformat";
import { Despesa } from "./despesa";

export class Alimentacao extends Despesa {

#tipoAlimentacao

constructor ( data, valor, local, pagamento, comentario, tipoAlimentacao, idViagem){
    super(data,valor,local,pagamento,comentario, idViagem);
    this.#tipoAlimentacao = tipoAlimentacao
}

get tipoAlimentacao(){
    return this.#tipoAlimentacao;
}

set tipoAlimentacao(tipoAlimentacao){
    this.#tipoAlimentacao = tipoAlimentacao;
}

toString() {
    return (
        "Alimentação:  \n" +
        "Data: " +  formatDateReadSQL(this.data) + " \n" + // Acesse o atributo diretamente se for público
        "Valor R$:" + this.valor.toFixed(2) + "\n" + // Acesse o atributo diretamente se for público
        "Método de pagamento: " + this.pagamento + "\n" + // Acesse o atributo diretamente se for público
        "Local: " + this.local + "\n" + // Acesse o atributo diretamente se for público
        "Tipo de Alimentação: " + this.tipoAlimentacao + "\n" +
        "Descrição: " + this.comentario + "\n" // Acesse o atributo diretamente se for público
    );
}

}