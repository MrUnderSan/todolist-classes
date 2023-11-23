import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const taskApi = {
    getTask(todolistId: string) {
        return axiosInstance.get<ResponseType<TaskResponseType[]>>(`/todo-lists/${todolistId}/tasks`)
    },
    updateTitle(todolistId: string, taskId: string, task: ModelTaskType) {
        return axiosInstance.put<UpdateResponse<{item: TaskResponseType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, task)
    }
}

export type ModelTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type TaskResponseType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseType <D = []> = {
    items: D
    totalCount: number
    error: string
}

export type UpdateResponse <D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}