import { User } from "../../types/user";
import { http } from "../../utils/http";

export const login = (params: Partial<User>) => http('/user/login', {
    method: 'POST',
    data: params
})

// 获取用户信息
export const getUserInfo = () => http('/user/getUserInfo', { method: 'GET' })

// 注册
export const register = (params: Partial<User>) => http('/user/register', {
    method: 'POST',
    data: params
})

// 注销
export const loginOut = () => http('/user/loginOut', { method: 'GET' })

