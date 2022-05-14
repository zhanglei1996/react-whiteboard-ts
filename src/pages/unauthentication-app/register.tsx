import { Form, Input } from 'antd'
import React from 'react'
import { LongButton } from './login'

export default function Register() {
  const handleSubmit = (values: { username: string, password: string }) => {
    console.log(values)
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item name="cpassword" rules={[{ required: true, message: "请再次输入密码" }]}>
        <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
      </Form.Item>
      <LongButton type={"primary"} htmlType={"submit"} loading={false}>登录</LongButton>
    </Form>
  )
}
