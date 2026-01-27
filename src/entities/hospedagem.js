import React from "react";
import { formatDateReadSQL } from "../constants/dateformat";


export class Hospedagem {
    #id;
    #data;
    #valor
    #local;
    #pagamento;
    #comentario;
    #tipoHospedagem
    #quantidadeDiarias
    #nomeHospedagem
    #idViagem


    constructor(data, valor, local, pagamento, comentario,tipo,diarias,nomehospedagem, idViagem){
        this.#data = data;
        this.#valor = valor;
        this.#local = local;
        this.#pagamento = pagamento;
        this.#comentario = comentario;
        this.#tipoHospedagem = tipo
        this.#quantidadeDiarias = diarias
        this.#nomeHospedagem = nomehospedagem
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

    get tipoHospedagem() {
        return this.#tipoHospedagem;
    }

    set tipoHospedagem(novoTipoHospedagem) {
        this.#tipoHospedagem = novoTipoHospedagem;
    }

    get quantidadeDiarias() {
        return this.#quantidadeDiarias;
    }

    set quantidadeDiarias(novoQuantidadeDiarias) {
        this.#quantidadeDiarias = novoQuantidadeDiarias;
    }
   

    get nomeHospedagem() {
        return this.#nomeHospedagem;
    }

    set nomeHospedagem(novoNomeHospedagem) {
        this.#nomeHospedagem = novoNomeHospedagem;
    }

    get idViagem (){
        return this.#idViagem;
    }

    toString() {
        return (
            "Hospedagem:  \n" +
            "Data: " + formatDateReadSQL(this.data) + "\n" +
            "Valor R$:" + this.valor.toFixed(2) + "\n" +
            "Método de pagamento: " + this.pagamento + "\n" +
            "Local: " + this.local + "\n" +
            "Tipo de Hospedagem: " + this.tipoHospedagem + "\n" +
            "Quantidade de Diárias: " + this.quantidadeDiarias + " dia(s)\n" +
            "Nome da Hospedagem: " + this.nomeHospedagem + "\n" +
            "Descrição: " + this.comentario + "\n" 
        );
    }
    
}   

