import { Abastecimento } from "../entities/abastecimento";
import { Alimentacao } from "../entities/alimentacao";
import { Despesa } from "../entities/despesa";
import { Diario } from "../entities/diario";
import { Estacionamento } from "../entities/estacionamento";
import { Hospedagem } from "../entities/hospedagem";
import { Manutencao } from "../entities/manutencao";
import { Passeio } from "../entities/passeio";
import { Pedagio } from "../entities/pedagio";

export function ShowDetails(item) {
    const categoria = item.categoria; 

    switch(categoria) {
        case 'abastecimento': 
            const abastecimento = new Abastecimento(
                item.data, 
                item.valor, 
                item.local, 
                item.metodoPagamento, 
                item.descricao, 
                item.quantidadeCombustivel, 
                item.idViagem
            );
            return abastecimento.toString();
        
        case 'alimentacao':
            const alimentacao = new Alimentacao(
                item.data, 
                item.valor, 
                item.local, 
                item.metodoPagamento, 
                item.descricao, 
                item.tipoAlimentacao, 
                item.idViagem
            );
            return alimentacao.toString();

        case 'despesa':
            const despesa = new Despesa(
                item.data, 
                item.valor, 
                item.local, 
                item.metodoPagamento, 
                item.descricao, 
                item.idViagem
            );
            return despesa.toString();
        
        case 'estacionamento':
            const estacionamento = new Estacionamento(
                item.data, 
                item.valor, 
                item.local, 
                item.metodoPagamento, 
                item.descricao, 
                item.quantidadeHoras, 
                item.idViagem
            );
            return estacionamento.toString();

        case 'hospedagem': 
            const hospedagem = new Hospedagem(
                item.data, 
                item.valor, 
                item.local, 
                item.metodoPagamento, 
                item.descricao, 
                item.tipo, 
                item.diarias, 
                item.nomeHospedagem, 
                item.idViagem
            );
            return hospedagem.toString();

        case 'manutencao': 
            const manutencao = new Manutencao(
                item.data, 
                item.valor, 
                item.local, 
                item.metodoPagamento, 
                item.descricao, 
                item.tipoDeManutencao, 
                item.idViagem
            );
            return manutencao.toString();

        case 'passeio':
            const passeio = new Passeio(
                item.data, 
                item.valor, 
                item.local, 
                item.metodoPagamento, 
                item.descricao, 
                item.idViagem, 
                item.nomePasseio
            );
            return passeio.toString();

        case 'pedagio':
            const pedagio = new Pedagio(
                item.data, 
                item.valor, 
                item.local, 
                item.metodoPagamento, 
                item.descricao, 
                item.idViagem, 
                item.qualidadeDaVia
            );
            return pedagio.toString();

        default:
            return "Categoria desconhecida.";
    }
}
