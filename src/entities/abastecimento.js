        import { Despesa } from "./despesa";
        import { formatDateReadSQL } from "../constants/dateformat";

        export class Abastecimento extends Despesa {

        #quantidade
        #valorPorLitro
        

        constructor (data, valor, local, pagamento, comentario, quantidade, idViagem){
            super(data,valor,local,pagamento,comentario, idViagem);
            this.#quantidade = quantidade;
            this.#valorPorLitro = this.calcularValorPorLitro()
            
        }

        calcularValorPorLitro() {
        
            if (this.#quantidade > 0) {
            return this.valor / this.#quantidade; 
            }
            return 0; 
        }

        get quantidade() {
            return this.#quantidade;
        }

        set quantidade(quantidade) {
            this.#quantidade = quantidade;
            this.#valorPorLitro = this.calcularValorPorLitro();
        }

        get valorPorLitro() {
            return this.#valorPorLitro;
        }

        toString() {
            return (
                "Abastecimento:  \n" +
                "Data: " + formatDateReadSQL(this.data) + "\n" + 
                "Valor R$: " + this.valor.toFixed(2) + "\n" + 
                "Método de pagamento: " + this.pagamento + "\n" + 
                "Local: " + this.local + "\n" + 
                "Quantidade de Combustível: " + this.quantidade + " Litros \n" +
                "Valor por Litro R$: " + this.valorPorLitro.toFixed(2) + "\n" +
                "Descrição: " + this.comentario + "\n"
            );
        }


        }