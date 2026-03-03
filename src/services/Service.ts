/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import axios from "axios";

const api = axios.create({ baseURL: 'https://projeto-2-fittrack.onrender.com/' });

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const buscar = async (url: string, setDados: Function) => {
    const resposta = await api.get(url);
    setDados(resposta.data);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const cadastrar = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const atualizar = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.put(url, dados)
    setDados(resposta.data);
}

export const deletar = async (url: string) => {
    await api.delete(url);
}