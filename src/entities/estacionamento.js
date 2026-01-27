import React from "react";
import { formatDateReadSQL } from "../constants/dateformat";


export class Estacionamento {
    #id;
    #data;
    #valor
    #local;
    #pagamento;
    #comentario;
    #quantidadeHoras;
    #idViagem



    constructor(data, valor, local, pagamento, comentario, quantidadeHoras, idViagem){
        this.#data = data;
        this.#valor = valor;
        this.#local = local;
        this.#pagamento = pagamento;
        this.#comentario = comentario;
        this.#quantidadeHoras = quantidadeHoras
        this.#idViagem = idViagem
    }


    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get data() {
        return this.#data;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    get valor (){
        return this.#valor;
    }

    set valor (valor){
        this.#valor = valor;
    }

    get local() {
        return this.#local;
    }

    set local(novoLocal) {
        this.#local = novoLocal;
    }

    get pagamento() {
        return this.#pagamento;
    }

    set pagamento(novoPagamento) {
        this.#pagamento = novoPagamento;
    }

    get comentario() {
        return this.#comentario;
    }

    set comentario(novoComentario) {
        this.#comentario = novoComentario;
    }

    get quantidadeHoras() {
        return this.#quantidadeHoras;
    }

    set quantidade(quantidade) {
        this.#quantidadeHoras = quantidade;
    }

    get idViagem (){
        return this.#idViagem;
    }

    toString() {
        return (
            "Estacionamento:  \n" +
            "Data: " + formatDateReadSQL(this.data) + "\n" +
            "Valor R$:" + this.valor.toFixed(2) + "\n" +
            "Método de pagamento: " + this.pagamento + "\n" +
            "Local: " + this.local + "\n" +
            "Quantidade de Horas: " + this.quantidadeHoras + " Hora(s)\n" +
            "Descrição: " + this.comentario + "\n" 
            
        );
    }


}

