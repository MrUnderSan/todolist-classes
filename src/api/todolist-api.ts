import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistApi = {
    fetchTodos() {
        return axiosInstance.get<TodolistResponseType[]>('todo-lists')
    }
}

export type TodolistResponseType = {
	id: string;
	title: string;
	addedDate: string;
	order: number;
}