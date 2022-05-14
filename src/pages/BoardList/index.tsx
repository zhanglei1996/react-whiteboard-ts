import React, { useState } from 'react';
import styled from '@emotion/styled'
import { Button, Dropdown, Menu, Divider, Empty, Spin, Checkbox } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { Row } from '../../components'
import { useAuth } from '../../context/auth';
import { useBoardList, useBoardRemove } from './config';
import { List } from './List';
import { BoardItem } from '../../types/board';
import { BoardCreateModal } from './create.modal';

export default function BoardList() {
    const { data: list, isLoading } = useBoardList()

    const { mutate: removeBoard, isLoading: removeLoading } = useBoardRemove()

    const [addVisible, setAddVisible] = useState<boolean>(false)

    const [selectIds, setSelectIds] = useState<number[]>([])

    const handleCheckboxChange = (id: number) => {
        const ids = [...selectIds]
        const index = ids.indexOf(id)

        if (index > -1) {
            ids.splice(index, 1)
        } else {
            ids.push(id)
        }
        setSelectIds(ids)
    }

    const handleOk = () => {
        setAddVisible(false)
    }

    const handleRemove = async () => {
        await removeBoard(selectIds)
        setSelectIds([])
    }

    return (
        <Container>
            <PageHeader />
            <ContentWrap>
                <Row gap={'2rem'}>
                    <Button type={'primary'} onClick={() => setAddVisible(true)}>创建白板</Button>
                    <Button type={'primary'} danger disabled={selectIds.length === 0} onClick={handleRemove} loading={removeLoading}>删除</Button>
                </Row>
                <Divider />
                {
                    isLoading ? <Spin /> : list && list.length > 0 ? <List boardList={list || []} CheckBoxWrap={(item: BoardItem) => <CheckBoxWrap onClick={(e) => e.stopPropagation()} checked={selectIds.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />} /> : <Empty />
                }
            </ContentWrap>

            <BoardCreateModal visible={addVisible} onOk={handleOk} onCancel={() => setAddVisible(false)}/>
        </Container>
    )
}

export const PageHeader = () => {
    const { user, loginOut } = useAuth()
    return <HeaderContainer between>
        <Row gap={1}>
            <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" />
            <LogoTitle>白板</LogoTitle>
        </Row>
        <Dropdown
            overlay={<Menu>
                <Menu.Item key={"logout"}>
                    <Button onClick={loginOut} type={"link"}>
                        登出
                    </Button>
                </Menu.Item>
            </Menu>}
        >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
                Hi, {user?.name}<DownOutlined />
            </Button>
        </Dropdown>
    </HeaderContainer>
}

const HeaderContainer = styled(Row)`
    padding: 0 2.4rem;
    box-shadow: 0 2px 8px #f0f1f2;
`

const LogoTitle = styled.h2`
    font-size: 2.4rem;
`

const Image = styled.img`
    width: 3.2rem;
    height: 3.2rem;
`

const Container = styled.div`
    display: grid;
    grid-template-rows: 6.4rem 1fr;
    height: 100vh;
`;

const ContentWrap = styled.div`
    width: 120rem;
    margin: 0 auto;
    padding: 12px;
    margin-top: 2rem;
`

const CheckBoxWrap = styled(Checkbox)`
    position: absolute;
    left: 1rem;
    top: 1rem;
`