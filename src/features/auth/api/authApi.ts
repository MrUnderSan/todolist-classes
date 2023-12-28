import {AxiosResponse} from 'axios';
import {ResponseType} from 'entities/todolist/api/todolistApi';
import {axiosInstance} from 'shared/api';

export class AuthApi {
    static authMe() {
        return axiosInstance.get<ResponseType<AuthDataType>>('auth/me')
    }
    static login(data: LoginDataType) {
        return axiosInstance.post<null, AxiosResponse<ResponseType<{ userId: number }>>, LoginDataType>('auth/login', data)
    }
    static logout() {
        return axiosInstance.delete<ResponseType>('auth/login')
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