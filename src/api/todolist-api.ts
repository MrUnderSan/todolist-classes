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
    },
    addTodo(title: string){
        return axiosInstance.post<null, AxiosResponse<ResponseType<{item: TodolistResponseType}>, {title: string}>>('todo-lists', {title})
    },
    removeTodo(id: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${id}`)
    }
}

export type ResponseType<D = {}> = {
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