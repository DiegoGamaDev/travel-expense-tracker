
const isValidNumber = (strValue) => {
    const regex = /^-?\d+(\.\d+)?$/; 
    return regex.test(strValue) && !/[^\d.-]/.test(strValue);
};


function verificacaoAbastecimento({ valor, local, pagamento, quantidade }) {
    const isValorValid = isValidNumber(valor) && Number(valor) > 0;
    const isQuantidadeValid = isValidNumber(quantidade) && Number(quantidade) > 0;
    const isLocalValid = local && local.trim() !== ''; 
    const isPagamentoValid = pagamento && pagamento.trim() !== ''; 

    return isValorValid && isQuantidadeValid && isLocalValid && isPagamentoValid;
}


function verificacaoAlimentacao({ valor, local, pagamento, tipoAlimentacao }) {
    const isValorValid = isValidNumber(valor) && Number(valor) > 0;
    const isLocalValid = local && local.trim() !== ''; 
    const isPagamentoValid = pagamento && pagamento.trim() !== ''; 
    const isTipoValid = tipoAlimentacao && tipoAlimentacao.trim() !== ''; 

    return isValorValid && isTipoValid && isLocalValid && isPagamentoValid;
}

function verificacaoDespesa({ valor, local, pagamento}) {
    const isValorValid = isValidNumber(valor) && Number(valor) > 0;
    const isLocalValid = local && local.trim() !== ''; 
    const isPagamentoValid = pagamento && pagamento.trim() !== ''; 
    
    return isValorValid && isLocalValid && isPagamentoValid;
}

function verificacaoEstacionamento({valor, local , pagamento, horasEstacionadas}) {
    const isValorValid = isValidNumber(valor) && Number(valor) >0;
    const isLocalValid = local && local.trim() !== '';
    const isPagamentoValid = pagamento && pagamento.trim() !== '';
    const isHorasEstacionadasValid = isValidNumber(horasEstacionadas) && Number(horasEstacionadas) > 0;

    console.log(`Valor: ${isValorValid} - ${valor}`);
    console.log(`Local: ${isLocalValid} - ${local}`);
    console.log(`Pagamento: ${isPagamentoValid} - ${pagamento}`);
    console.log(`Horas estacionadas: ${isHorasEstacionadasValid} - ${horasEstacionadas}`)

    return isValorValid && isLocalValid && isPagamentoValid && isHorasEstacionadasValid;
}

function verificacaoHospedagem({ valor, local, pagamento, nomeHospedagem, tipoHospedagem, quantidadeDiarias}) {
    const isValorValid = isValidNumber(valor) && Number(valor) > 0;
    const isLocalValid = local && local.trim() !== ''; 
    const isPagamentoValid = pagamento && pagamento.trim() !== ''; 
    const isNomeHospedagemValid = nomeHospedagem && nomeHospedagem.trim() !== '';
    const isTipoHospedagemValid = tipoHospedagem && tipoHospedagem.trim() !== '';
    const isQuantidadeDiariasValid = isValidNumber(quantidadeDiarias) && Number(quantidadeDiarias) > 0; 

    return isValorValid && isLocalValid && isPagamentoValid && isNomeHospedagemValid && isTipoHospedagemValid && isQuantidadeDiariasValid;


}

function verificacaoManutencao({valor, local, pagamento, tipoManutencao}) {
    const isValorValid = isValidNumber(valor) && Number(valor) > 0;
    const isLocalValid = local && local.trim() !== ''; 
    const isPagamentoValid = pagamento && pagamento.trim() !== ''; 
    const isTipoManutencaoValid = tipoManutencao && tipoManutencao.trim() !== '';

    return isValorValid && isLocalValid && isPagamentoValid && isTipoManutencaoValid;

}

function verificacaoPasseio({valor, pagamento, local, nomePasseio}) {
    const isValorValid = isValidNumber(valor) && Number(valor) > 0;
    const isLocalValid = local && local.trim() !== ''; 
    const isPagamentoValid = pagamento && pagamento.trim() !== ''; 
    const isNomePasseioValid = nomePasseio && nomePasseio.trim() !== '';

    console.log(`Valor: ${valor}`)
    console.log(`Local: ${local}`)
    console.log(`Pagamento: ${pagamento}`)
    console.log(`Nome passeio: ${nomePasseio}`)

    return isValorValid && isLocalValid && isPagamentoValid && isNomePasseioValid;
    
}

function verificacaoPedagio({valor, pagamento, local, qualidadeDaVia}) {
    const isValorValid = isValidNumber(valor) && Number(valor) > 0;
    const isLocalValid = local && local.trim() !== ''; 
    const isPagamentoValid = pagamento && pagamento.trim() !== ''; 
    const isQualidadeDaViaValid = qualidadeDaVia && qualidadeDaVia.trim() !== '';

    console.log(`Valor: ${valor}`)
    console.log(`Local: ${local}`)
    console.log(`Pagamento: ${pagamento}`)
    console.log(`Qualidade da via: ${qualidadeDaVia}`)

    return isValorValid && isLocalValid && isPagamentoValid && isQualidadeDaViaValid;
}

function verificacaoViagem({nome,localDePartida, kilometragemInicial}) {
    const isNomeValid = nome && nome.trim() !== '';
    const isLocalDePartidaValid = localDePartida && localDePartida.trim() !== '';
    const isKilometragemInicialValid = isValidNumber(kilometragemInicial) && Number(kilometragemInicial) > 0;

    console.log(isNomeValid)
    console.log(`Local: ${localDePartida}`)
    console.log(isKilometragemInicialValid)

    return isNomeValid && isLocalDePartidaValid && isKilometragemInicialValid;
}


export {verificacaoAbastecimento,verificacaoAlimentacao,verificacaoDespesa,
        verificacaoEstacionamento,verificacaoHospedagem,verificacaoManutencao,
        verificacaoPasseio,verificacaoPedagio,verificacaoViagem
};
 