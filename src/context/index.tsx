import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from "react-redux";
import { store } from "../sotre";
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from "antd";


// 创建一个 client
const queryClient = new QueryClient()

export default function AppProvider({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>{children}</AuthProvider>
                </QueryClientProvider>
            </ConfigProvider>
        </Provider>
    )
}