import styled from '@emotion/styled'
import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { useAuth } from '../../context/auth'

export default function Login() {
    const [isLoading, setLoading] = useState(false)
    const { login } = useAuth()

    const handleSubmit = async (values: { name: string, password: string }) => {
        try {
            setLoading(true)
            await login(values)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            message.error('登录失败')
        }

    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name="name" rules={[{ required: true, message: "请输入用户名" }]}>
                <Input placeholder={"用户名"} type="text" id={"username"} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
                <Input placeholder={"密码"} type="password" id={"password"} />
            </Form.Item>
            <LongButton type={"primary"} htmlType={"submit"} loading={isLoading}>登录</LongButton>
        </Form>
    )
}

export const LongButton = styled(Button)`
    width: 100%;
`
