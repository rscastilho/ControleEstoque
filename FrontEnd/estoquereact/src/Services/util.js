
export const UtilService = {
    // getDate,
    // replaceAll,
    // guid,
    // getLower,
    // formatDateTime,
    // onlyNumber,
    formatDate,
    getUpperCase,
    formatCurrency,
    validaPerfil,
    tipoPagamento,
    statusPedido,
    cnpj,
    cpf,
    localImagem,
    // formatNumberIdioma,
    // generateExcel,
    // compareValues,
    // configDate
};

function localImagem(imagemUrl){

    return `https://localhost:5001/recursos/imagens/${imagemUrl}`

}



function formatDate(dataCrida){

    const date = new Date(dataCrida)
    const retornaData = Intl.DateTimeFormat('pt-BR',{
        weekday:"long",
        year:'numeric',
        month:'long',
        day: 'numeric'
    })
    const dataFinal = retornaData.format(date);
    return dataFinal

}

function getUpperCase(text){
    let upper = text.toUpperCase()
    return upper
}

function formatCurrency(value) {

    if (Number.isNaN(value) || value === null || value === '' || value === "NaN") {
        return 0;
    }
    value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return value;
}

function validaPerfil(perfil) {
    switch (perfil) {
        case 0: return 'Administrador';
            break;
        case 1: return 'Fornecedor';
            break;
        case 2: return 'Cliente';
            break;
        case 3: return 'Funcionario';
            break;
        case 4: return 'Visitante';
        default:
            return "Erro"
    }
}

function tipoPagamento(tipoPagamento) {
    switch (tipoPagamento) {
        case 0: return 'Cartão de crédito';
            break;
        case 1: return 'Boleto';
            break;
        case 2: return 'PIX';
            break;
        case 3: return 'Débito em conta';
            break;

        default:
            return "Erro"
    }

}

function statusPedido(statusPedidos) {
    switch (statusPedidos) {
        case 0: return 'Pedido realizado';
            break;
        case 1: return 'Pedido Autorizado';
            break;
        case 2: return 'Aguardando confirmação de pagamento';
            break;
        case 3: return 'Pagamento Aprovado';
            break;
        case 4: return 'Pedido em separação';
            break;
        case 5: return 'Em Transporte';
            break;
        case 6: return 'Entregue';
            break;
        case 7: return 'Pedido Cancelado';
            break;
        default:
            return "Erro"
    }
}

function cnpj(cnpj){
    cnpj=cnpj.replace(/\D/g,"")                           
    cnpj=cnpj.replace(/^(\d{2})(\d)/,"$1.$2")             
    cnpj=cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") 
    cnpj=cnpj.replace(/\.(\d{3})(\d)/,".$1/$2")           
    cnpj=cnpj.replace(/(\d{4})(\d)/,"$1-$2")              
    return cnpj
}
function cpf(cpf){
    cpf=cpf.replace(/\D/g,"")                    
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")       
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")       
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2") 
    return cpf
}


export default UtilService;