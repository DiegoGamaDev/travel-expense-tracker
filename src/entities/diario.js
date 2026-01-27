

export class Diario {

    #id
    #data
    #local
    #comentario
    #idViagem

    constructor(data,local,comentario, idViagem){
        this.#data = data
        this.#local = local
        this.#comentario = comentario
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

    get local() {
        return this.#local;
    }
 
    set local(novoLocal) {
        this.#local = novoLocal;
    }

    get comentario() {
        return this.#comentario;
    }

    set comentario(novoComentario) {
        this.#comentario = novoComentario;
    }

    get idViagem (){
        return this.#idViagem;
    }

    toString() {
        return `Diário:
        Data: ${this.#data}
        Local: ${this.#local}
        Comentário: ${this.#comentario}`;
    }

}