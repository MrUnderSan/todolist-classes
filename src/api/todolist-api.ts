import axios, {AxiosResponse} from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistApi = {
    fetchTodos() {
        return axiosInstance.get<TodolistResponseType[]>('todo-lists')
    },
    updateTitle(id: string, title: string){
        return axiosInstance.put<null, AxiosResponse<ResponseType>, {title: string}>(`todo-lists/${id}`, {title})
    }
}

type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export type TodolistResponseType = {
	id: string;
	title: string;
	addedDate: string;
	order: number;
}