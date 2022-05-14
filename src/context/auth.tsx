import { message } from "antd"
import React, { createContext, ReactNode, useContext, useEffect } from "react"
import { useQueryClient } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import { FullPageErrorFallback, FullPageLoading } from "../components"
import * as auth from "../services/fetchs/auth"
import { selectUser, setUser } from "../sotre/auth.slice"
import { User } from "../types/user"
import { useAsync } from "../utils/use-async"

const AuthContext = createContext<{
    login: (form: Partial<User>) => Promise<void>;
    register: (form: Partial<User>) => Promise<void>;
    loginOut: () => Promise<void>;
    user: User | null;
} | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    
    const queryClient = useQueryClient()

    const { run, isLoading, isError, isIdle } = useAsync<User | null>()

    useEffect(() => {
        run(getUserInfo())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [run])

    const getUserInfo = async () => {
        const result = await auth.getUserInfo()
        if (result.code === 200) {
            dispatch(setUser(result.data))
            return result.data
        } else {
            return null
        }
    }

    if (isLoading || isIdle) {
        return <FullPageLoading />
    }

    if (isError) {
        return <FullPageErrorFallback />;
    }



    const login = (form: Partial<User>) => auth.login(form).then(res => {
        if (res.code === 200) {
            const { data } = res
            dispatch(setUser(data))
            message.success('登录成功')
        } else {
            message.error(res.message);
        }
    })
    const register = (form: Partial<User>) => auth.login(form).then(res => {
        if (res.code === 200) {
            const { data } = res
            dispatch(setUser(data))
            message.success('注册成功')
        } else {
            message.error(res.message);
        }
    })

    const loginOut = () => auth.loginOut().then(() => { dispatch(setUser(null)); queryClient.setQueryData('boardList', []) })
    return <AuthContext.Provider value={{ user, login, loginOut, register }} children={children} />
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
}