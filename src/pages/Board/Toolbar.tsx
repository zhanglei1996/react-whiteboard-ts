import styled from '@emotion/styled'
import { Tooltip } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconFont from '../../components/IconFont'
import { ToolBarConfig } from './config'
import { selectSvgHistory, setCurrUseTool, setStroke, setStrokeWidth, setSvgData } from './store/board.slice'
import { Toolbar as ToolbarEnum } from './utils'


export default function Toolbar() {

    const dispatch = useDispatch()
    const svgHistory = useSelector(selectSvgHistory)

    const handleIconClick = (type: ToolbarEnum) => {
        if(type === ToolbarEnum.eraser) {
            dispatch(setStroke('#f7f9fa'))
            dispatch(setStrokeWidth(54))
        }else if(type === ToolbarEnum.pen || type === ToolbarEnum.line) {
            dispatch(setStroke('#2b90ef'))
            dispatch(setStrokeWidth(3))
        }else if(type === ToolbarEnum.delete) {
            dispatch(setSvgData([]))
            return
        }else if(type === ToolbarEnum.back) {
            dispatch(setSvgData(svgHistory.pop()))
            return
        }

        dispatch(setCurrUseTool(type))
    }
 
    return (
        <ToolbarWrap>
            <ToolbarList>
                {
                    ToolBarConfig.map(item => <Tooltip placement="right" title={item.title} key={item.type}>
                        <IconWrap onClick={() => handleIconClick(item.type)}>
                            <Icon type={item.iconType} />
                        </IconWrap>
                    </Tooltip>)
                }
            </ToolbarList>
        </ToolbarWrap>
    )
}

const ToolbarWrap = styled.div`
    width: 5.5rem;
    height: 50rem;
    height: auto;
    border-radius: .4rem;
    position: absolute;
    left: 0;
    top: 50%;
    background-color: #fff;
    box-shadow: 0 .2rem .6rem 0 rgb(0 0 0 / 8%);
    z-index: 1050;
    padding: .8rem 0;
    transform: translate(1.2rem,-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ToolbarList = styled.div`
    flex: 1;

`

export const IconWrap = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover {
        background: #f7f7f7;
    }
`

export const Icon = styled(IconFont)`
    font-size: 2rem;
`