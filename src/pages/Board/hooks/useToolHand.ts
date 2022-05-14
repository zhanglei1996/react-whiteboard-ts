import { rafThrottle } from "@/utils"
import { useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PosType, selectPos, setIsMove, setPos } from "../store/board.slice"

// 处理抓手
export const useToolHand = () => {

    const pos = useSelector(selectPos)
    const dispatch = useDispatch()

    // 记录开始拖动初始Pos
    const startPos = useRef<PosType>(pos)

    // 开始拖动的初始鼠标位置
    const startMousePos = useRef<{
        clientX: number,
        clientY: number
    }>({
        clientX: 0,
        clientY: 0
    })

    const handleMove = rafThrottle(useCallback((ev: any) => {
        ev.stopPropagation()
        const { x, y } = startPos.current
        const { clientX, clientY } = startMousePos.current
        const evClentX = ev.clientX || ev.touches?.[0].clientX
        const evClentY = ev.clientY || ev.touches?.[0].clientY
        const move_x = evClentX - clientX
        const move_y = evClentY - clientY
        dispatch(setPos({
            x: x + move_x,
            y: y + move_y
        }))

    }, [dispatch]))

    const handleMouseUp = useCallback(() => {
        dispatch(setIsMove(false))
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('touchmove', handleMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchend', handleMouseUp)
    }, [handleMove,dispatch])

    const handleToolHand = useCallback((ev: any) => {
        dispatch(setIsMove(true))
        startPos.current = pos
        startMousePos.current = {
            clientX: ev.clientX || ev.touches?.[0].clientX,
            clientY: ev.clientY || ev.touches?.[0].clientY
        }
        window.addEventListener('mousemove', handleMove, false)
        window.addEventListener('touchmove', handleMove, false)
        window.addEventListener('mouseup', handleMouseUp, false)
        window.addEventListener('touchend', handleMouseUp, false)   
    }, [handleMove, handleMouseUp, pos, dispatch])

    return {
        handleToolHand
    }
}