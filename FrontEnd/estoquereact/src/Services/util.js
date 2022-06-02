
export const UtilService = {
    // getDate,
    // replaceAll,
    // guid,
    // getLower,
    // formatDate,
    // formatDateTime,
    // onlyNumber,
    formatCurrency,
    validaPerfil,
    // formatNumberIdioma,
    // generateExcel,
    // compareValues,
    // configDate
};

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


    export default UtilService;