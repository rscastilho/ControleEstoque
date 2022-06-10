import jwt_decode from 'jwt-decode';


export const validaPerfil = (token) => {
    const decriptaToken = jwt_decode(token);
        
    switch (decriptaToken.role) {
        case 'Administrador': return 0;
            break;
        case 'Fornecedor': return 1;
            break;
        case 'Cliente': return 2;
            break;
        case 'Funcionario': return 3;
            break;
        case 'Visitante': return 4;
            break;
        default:
            return console.log("erro ao decriptar token")
    }

}

