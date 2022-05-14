import styled from '@emotion/styled'
import BoardApp from './BoardApp'
import BoardHeader from './BoardHeader'
import Toolbar from './Toolbar'
import './style/index.less'

export default function Board() {
  return (
    <BoardContainer>
        <BoardHeader />
        <Toolbar />
        <BoardApp />
    </BoardContainer>
  )
}

const BoardContainer = styled.div`
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background: #f7f9fa;
`
