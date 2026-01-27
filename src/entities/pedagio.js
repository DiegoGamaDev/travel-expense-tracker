import { formatDateReadSQL } from "../constants/dateformat";
import { Despesa } from "./despesa";

export class Pedagio extends Despesa{

    #qualidadeDaVia

    constructor(data,valor,local,pagamento,comentario,idViagem,qualidadeDaVia){
        super(data,valor,local,pagamento,comentario,idViagem)
        this.#qualidadeDaVia = qualidadeDaVia
    }

    get qualidadeDaVia(){
        return this.#qualidadeDaVia
    }

    set qualidadeDaVia(value){
        this.#qualidadeDaVia = value
    }

    toString() {
        return (
            "Pedágio:  \n" +
            "Data: " + formatDateReadSQL(this.data) + "\n" +
            "Valor R$:" + this.valor.toFixed(2) + "\n" +
            "Método de pagamento: " + this.pagamento + "\n" +
            "Local: " + this.local + "\n" +
            "Qualidade da Via: " + this.qualidadeDaVia + "\n" +
            "Descrição: " + this.comentario + "\n"
        );
    }
}