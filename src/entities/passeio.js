import { formatDateReadSQL } from "../constants/dateformat";
import { Despesa } from "./despesa";

export class Passeio extends Despesa {

    #nomePasseio

    constructor(data,valor,local,pagamento,comentario,idViagem,nomePasseio){
        super(data,valor,local,pagamento,comentario,idViagem)
        this.#nomePasseio = nomePasseio;
    }       

    get nomePasseio(){
        return this.#nomePasseio
    }

    set nomePasseio(value){
        this.#nomePasseio = value
    }

    toString() {
        return (
            "Passeio:  \n" +
            "Data: " + formatDateReadSQL(this.data) + "\n" +
            "Valor R$:" + this.valor.toFixed(2) + "\n" +
            "Método de pagamento: " + this.pagamento + "\n" +
            "Local: " + this.local + "\n" +
            "Nome do Passeio: " + this.nomePasseio + "\n" +
            "Descrição: " + this.comentario + "\n" 
           
        );
    }
}