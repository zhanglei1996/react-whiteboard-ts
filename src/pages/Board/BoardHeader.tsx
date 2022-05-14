import styled from '@emotion/styled'
import { Row, Tooltip } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'
import { Icon, IconWrap } from './Toolbar'

export default function BoardHeader() {
    const navgiate = useNavigate()
    return (
        <HeaderContainer>
            <HeaderLeft>
                <LeftContainer>
                    <Tooltip placement="bottom" title={'点击返回'}>
                        <IconWrap onClick={() => navgiate('/list')}>
                            <Icon type="iconfanhui" />
                        </IconWrap>
                    </Tooltip>
                </LeftContainer>
            </HeaderLeft>
            <HeaderRight>

            </HeaderRight>
        </HeaderContainer>
    )
}

const HeaderContainer = styled(Row)`
    position: absolute;
    top: 12px;
    left: 0;
    right: 0;
    z-index: 1050;
    pointer-events: none;
    transition: left .25s ease-out;
    padding: 0 1.2rem;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled(Row)``

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    padding: .4rem;
    border-radius: .4rem;
    background-color: #fff;
    box-shadow: 0 .2rem 1rem rgb(0 0 0 / 3%);
    pointer-events: auto;
`

