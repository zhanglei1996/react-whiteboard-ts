import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, Card, Divider } from "antd";
import Login from "./login";
import Register from "./register";

export default function UnAuthenticationApp() {
    const [isRegister, setIsRegister] = useState(false);
    useEffect(() => {
       const ribbons = new (window as any).Ribbons()

       return () => ribbons.destroy()
    },[])

    return (
        <Container id="canvasBg">
            <ShadowCard>
                <Title>{isRegister ? '注册新账号' : '请登录'}</Title>
                {
                    isRegister ? <Register /> : <Login />
                }
                <Divider />
                <Button type={"link"} onClick={() => setIsRegister(!isRegister)}> { isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'} </Button>
            </ShadowCard>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding: 3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center; 
`
const Title = styled.h2`
  margin-bottom: 3.4rem;
  color: rgb(94, 108, 132);
  font-size: 2rem
`;