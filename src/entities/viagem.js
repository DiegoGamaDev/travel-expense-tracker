

export class Viagem {
    #id;
    #nome;
    #dataDeInicio;
    #dataDeTermino;
    #localDePartida;
    #destinoFinal;
    #kilometragemInicial;
    #kilometragemParcial;
    #kilometragemFinal;
    #gastoParcial;
    #gastoTotal;
    #status;

    
    
    constructor(id, nome, dataDeInicio, localDePartida, destinoFinal, kilometragemInicial) {
      this.#id = id || null;
      this.#nome = nome;
      this.#dataDeInicio = dataDeInicio;
      this.#localDePartida = localDePartida ;
      this.#destinoFinal = destinoFinal || '';
      this.#kilometragemInicial = kilometragemInicial;
      this.#status = true;
  
      // Listas relacionadas
      this.abastecimentos = [];
      this.alimentacoes = [];
      this.despesas = [];
      this.diario = [];
      this.estacionamentos = [];
      this.hospedagens = [];
      this.manutencoes = [];
      this.passeios = [];
      this.pedagios = [];
    }
  
    // Getters e Setters
    getId() {
      return this.#id;
    }
  
    setId(id) {
      this.#id = id;
    }
  
    getNome() {
      return this.#nome;
    }
  
    setNome(nome) {
      this.#nome = nome;
    }
  
    getDataDeInicio() {
      return this.#dataDeInicio;
    }
  
    setDataDeInicio(dataDeInicio) {
      this.#dataDeInicio = new Date(dataDeInicio);
    }
  
    getDataDeTermino() {
      return this.#dataDeTermino;
    }
  
    setDataDeTermino(dataDeTermino) {
      this.#dataDeTermino = new Date(dataDeTermino);
    }
  
    getLocalDePartida() {
      return this.#localDePartida;
    }
  
    setLocalDePartida(localDePartida) {
      this.#localDePartida = localDePartida;
    }
  
    getDestinoFinal() {
      return this.#destinoFinal;
    }
  
    setDestinoFinal(destinoFinal) {
      this.#destinoFinal = destinoFinal;
    }
  
    getKilometragemInicial() {
      return this.#kilometragemInicial;
    }
  
    setKilometragemInicial(kilometragemInicial) {
      this.#kilometragemInicial = kilometragemInicial;
    }
  
    getKilometragemParcial() {
      return this.#kilometragemParcial;
    }
  
    setKilometragemParcial(kilometragemParcial) {
      this.#kilometragemParcial = kilometragemParcial;
    }
  
    addKilometragemParcial(kilometragemParcial) {
      this.#kilometragemParcial += kilometragemParcial;
    }
  
    getKilometragemFinal() {
      return this.#kilometragemFinal;
    }
  
    setKilometragemFinal(kilometragemFinal) {
      this.#kilometragemFinal = kilometragemFinal;
    }
  
    getGastoParcial() {
      return this.#gastoParcial;
    }
  
    setGastoParcial(gastoParcial) {
      this.#gastoParcial = gastoParcial;
    }
  
    getGastoTotal() {
      return this.#gastoTotal;
    }
  
    setGastoTotal(gastoTotal) {
      this.#gastoTotal = gastoTotal;
    }
  
    getStatus() {
      return this.#status;
    }
  
    setStatus(status) {
      this.#status = status;
    }
  
    isAberta() {
      return this.#status ? 'Em andamento.' : 'Encerrada';
    }
  
    getSumarioViagem() {
      const status = this.isAberta();
      const resumo = [
        `Nome da Viagem: ${this.#nome}`,
        `Status da viagem: ${status}`,
        `Data de início: ${this.#dataDeInicio.toLocaleDateString()}`,
        `Local de partida: ${this.#localDePartida}`,
        `Kilometragem inicial: ${this.#kilometragemInicial}`,
        `Kilometragem percorrida: ${this.#kilometragemParcial}`,
        `Gasto parcial: ${this.#gastoParcial}`,
        `Quantidade de Abastecimentos: ${this.abastecimentos.length}`,
        `Quantidade de Estacionamentos: ${this.estacionamentos.length}`,
        `Quantidade de Hospedagens: ${this.hospedagens.length}`,
        `Quantidade de Manutenções: ${this.manutencoes.length}`,
        `Quantidade de Passeios: ${this.passeios.length}`,
        `Quantidade de Pedágios: ${this.pedagios.length}`,
      ];
  
      if (!this.#status) {
        resumo.splice(6, 0, `Kilometragem final: ${this.#kilometragemFinal}`);
        resumo.splice(7, 0, `Gasto total: ${this.#gastoTotal}`);
      }
  
      return resumo.join('\n');
    }
  
    calcularDiasAteHoje() {
      const hoje = new Date();
      if (this.#dataDeInicio) {
        return Math.floor((hoje - this.#dataDeInicio) / (1000 * 60 * 60 * 24));
      }
      return 0;
    }
  
    calcularDiasEncerrado() {
      if (this.#dataDeInicio && this.#dataDeTermino) {
        return Math.floor((this.#dataDeTermino - this.#dataDeInicio) / (1000 * 60 * 60 * 24));
      }
      return 0;
    }
  }
  
  