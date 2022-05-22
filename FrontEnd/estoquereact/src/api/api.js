import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const urlApi = 'https://localhost:5001/api'
const aut = `bearer ${JSON.parse(localStorage.getItem(('token')))}`


toast.configure();

export const apis = {
    login,
    register,
    GetAllCategorias
}

async function login(dadosUsuario) {
    try {
        if (dadosUsuario) {
            const usuarioLogado = await axios.post(`${urlApi}/usuarios/login`, dadosUsuario);
            // console.log("retorno post login", usuarioLogado)
            if (usuarioLogado.data.tokenUsuario.result) {

                const { result } = usuarioLogado.data.tokenUsuario;
                const { email, nome, ultimoAcesso } = usuarioLogado.data.usuario;

                axios.defaults.headers.Authorization = `Bearer ${result}`;
                localStorage.setItem('token', JSON.stringify(result));
                localStorage.setItem('email', JSON.stringify(email));
                localStorage.setItem('nome', JSON.stringify(nome));
                localStorage.setItem('ultimoAcesso', JSON.stringify(ultimoAcesso));
                toast.success(`usuario ${nome} logado com sucesso!`, { autoClose: 1500, position: "bottom-center" })
                
            } else {
            
               toast.warning("Erro ao logar no sistema: ", usuarioLogado.data.mensagem, { autoClose: 1500 })
                console.log("retorna false")
                return false
            }
        } else {
            toast.warning("Erro ao processar dados de login", { autoClose: 1500 })
            console.log("retorna false")
            return false
        }

    } catch (error) {
        toast.error("erro do sistema" + error.message, { autoClose: 2000 })
        return false
    }
}

async function register(dadosUsuario) {
    try {
        const usuarioCadastrado = await axios.post(`${urlApi}/usuarios/Registrar`, dadosUsuario);
        console.log("usasrio cadastrado", usuarioCadastrado)
        console.log(usuarioCadastrado.data.mensagem)
    } catch (error) {
        console.log(error);
    }

}

async function GetAllCategorias() {
    try {
        return await axios.get(`${urlApi}/Categorias`, { headers: { Authorization: aut } })


    } catch (error) {
        console.log(error)
    }
}



export default apis;

