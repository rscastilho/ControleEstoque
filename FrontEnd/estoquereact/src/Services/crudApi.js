import { toast } from "react-toastify";
import WebApi from "../api/WebApi";
import 'react-toastify/dist/ReactToastify.css'


export const getAll = async (local) => {
    try {
        const resultado = await WebApi.get(local)
        return resultado

    } catch (error) {
        toast.error(error.menssage, { autoClose: 2000 })
    }
}

export const getById = async (local) => {
    try {
        const resultado = await WebApi.get(local);
        return resultado

    } catch (error) {
        toast.error(error.menssage, { autoClose: 2000 })
    }
}

export const getByName = async (local, name) => {
    try {

        const resultado = await WebApi.get(local, name);
        return resultado

    } catch (error) {
        toast.error(error.menssage, { autoClose: 2000 })

    }
}

export const post = async (local, data) => {
    try {
        const resultado = await WebApi.post(local, data);
        toast.success(resultado.data.mensagem, { autoClose: 2000 })
        return resultado

    } catch (error) {
        toast.error(error, { autoClose: 2000 })
        console.log(error)
    }
}

export const put = async (local, data) => {
    try {
        const resultado = await WebApi.put(local, data);
        toast.success(resultado.data.mensagem, { autoClose: 2000 })
        return resultado;
    } catch (error) {
        toast.error(error.menssage, { autoClose: 2000 })
    }
}

export const del = async (local, id) => {
    try {
        const resultado = await WebApi.delete(local, id);
        toast.success(resultado.data.mensagem, { autoClose: 2000 })
        return resultado;

    } catch (error) {
        toast.error(error.menssage, { autoClose: 2000 })
    }
}

export const salvarImagem = async (local, imagem) => {
    try {
        const resultado = await WebApi.post(local, imagem);
        toast.success(resultado.data.mensagem, { autoClose: 2000 })
        return resultado;

    } catch (error) {
        toast.error(error.menssage, { autoClose: 2000 })
    }
}