import WebApi from "../api/WebApi";
import { mensagemSucesso, mensagemErro } from './../components/toastMessages/ToastMessage';


export const getAll = async (local) => {
    try {
        const resultado = await WebApi.get(local)
        return resultado
    } catch (error) {
        mensagemErro(error.message)
    }
}

export const getById = async (local) => {
    try {
        const resultado = await WebApi.get(local);
        return resultado
    } catch (error) {
        mensagemErro(error.message)
    }
}

export const getByName = async (local, name) => {
    try {
        const resultado = await WebApi.get(local, name);
        return resultado
    } catch (error) {
        mensagemErro(error.message)
    }
}

export const post = async (local, data) => {
    try {
        const resultado = await WebApi.post(local, data);
        mensagemSucesso(resultado.data.mensagem);
        return resultado
    } catch (error) {
        mensagemErro(error.message)
        console.log(error)
    }
}

export const put = async (local, data) => {
    try {
        const resultado = await WebApi.put(local, data);
        mensagemSucesso(resultado.data.mensagem);
        return resultado;
    } catch (error) {
        mensagemErro(error.message)
    }
}

export const del = async (local, id) => {
    try {
        const resultado = await WebApi.delete(local, id);
        mensagemSucesso(resultado.data.mensagem);
        return resultado;
    } catch (error) {
        mensagemErro(error.message)
    }
}

export const salvarImagem = async (local, imagem) => {
    try {
        const resultado = await WebApi.post(local, imagem);
        mensagemSucesso(resultado.data.mensagem);
        return resultado;
    } catch (error) {
        mensagemErro(error.message)
    }
}