
import { message } from 'antd';
import qs from 'qs'
import { useCallback } from 'react';
import { store } from '../sotre';
import { setUser } from '../sotre/auth.slice';
// import { useCallback } from 'react';

const proxy = process.env.NODE_ENV === 'development' ? 'api' : 'api'

interface Config extends RequestInit {
    data?: object;
    token?: string;
}

export const http = (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig,
    };

    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }
    return window.fetch(`/${proxy}${endpoint}`, config).then(async (response) => {
        if (response.status === 401) {
            store.dispatch(setUser(null))
            message.error('请重新登录')
        }
        const data = await response.json();
        if (response.ok) {
            if(data?.code === 401) {
                message.error('没有权限')
                return data
            }
            return data;
        } else {
            return data;
        }
    })
}

export const useHttp = () => {
    return useCallback((...[endpoint, config]: Parameters<typeof http>) =>
        http(endpoint, { ...config }), []);
};