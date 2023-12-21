import axios, {AxiosResponse} from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const taskApi = {
    getTask(todolistId: string) {
        return axiosInstance.get<GetResponseType<TaskResponseType[]>>(`/todo-lists/${todolistId}/tasks`)
    },
    updateTask(model: updateTitleApiType) {
        return axiosInstance.put<ResponseType<{item: TaskResponseType}>>(`todo-lists/${model.todolistId}/tasks/${model.taskId}`, model.task)
    },
    createTask(todolistId: string, title: string) {
        return axiosInstance.post<null, AxiosResponse<ResponseType<{item: TaskResponseType}>>, {title: string}>(`todo-lists/${todolistId}/tasks`, {title})
    }
}

export type updateTitleApiType = {
    todolistId: string,
    taskId: string,
    task: ModelTaskType
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

export type GetResponseType <D = []> = {
    items: D
    totalCount: number
    error: string
}

export type ResponseType <D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}