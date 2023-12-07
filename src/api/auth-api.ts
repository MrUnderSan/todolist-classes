import axios, {AxiosResponse} from 'axios';
import {ResponseType} from './todolist-api';

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/',
    withCredentials: true
})

export class AuthApi {
    static authMe() {
        return axiosInstance.get<ResponseType<AuthDataType>>('me')
    }
    static login(data: LoginDataType) {
        return axiosInstance.post<null, AxiosResponse<ResponseType<{ userId: number }>>, LoginDataType>('login', data)
    }
    static logout() {
        return axiosInstance.delete<ResponseType>('login')
    }
}

export type AuthDataType = {
    id: number;
    login: string;
    email: string;
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}