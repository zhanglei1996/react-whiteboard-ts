
import { rafThrottle } from "@/utils"
import { useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PosType, selectCurrUseTool, selectPos, setCurDrawPath } from "../store/board.slice"
import { Toolbar } from "../utils"
import { useSvgDataItem } from "./useSvgDataItem"


/**
 * 用于画path
 */
export const useDraw = () => {
    /**
     * path的路径拼接
     */
    const svgPath = useRef<string>('')
    const dispatch = useDispatch()
    const { getSvgDataItem, pushSvgDataItem } = useSvgDataItem()
    const transform_pos = useSelector(selectPos)
    const currUseTool = useSelector(selectCurrUseTool)

    const startPos = useRef<PosType | null>()
    const endPos = useRef<PosType | null>()

    // 获取修正后的pos
    const getFixPos = useCallback((pos: PosType) => {
        return {
            x: pos.x - transform_pos.x,
            y: pos.y - transform_pos.y
        }
    }, [transform_pos])

    const handleMove = rafThrottle(useCallback((ev: any) => {
        ev.stopPropagation()
        const { x, y } = endPos.current = getFixPos({
            x: ev.clientX || ev.touches?.[0].clientX,
            y: ev.clientY || ev.touches?.[0].clientY
        })
        if (currUseTool === Toolbar.pen || currUseTool === Toolbar.eraser) {
            svgPath.current = svgPath.current + ` L ${x} ${y}`
        } else if (currUseTool === Toolbar.line) {
            svgPath.current = `M ${startPos.current?.x} ${startPos.current?.y} L ${endPos.current?.x} ${endPos.current?.y}`
        }


        dispatch(setCurDrawPath(getSvgDataItem(svgPath.current)))
    }, [getFixPos, currUseTool, dispatch, getSvgDataItem]))

    const handleMouseUp = useCallback(() => {
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('touchmove', handleMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchend', handleMouseUp)
        const fn = () => {
            pushSvgDataItem(getSvgDataItem(svgPath.current || ''))
            dispatch(setCurDrawPath(getSvgDataItem('')))
            endPos.current = null
        }

        if (endPos.current) {
            fn()
        } else if (currUseTool === Toolbar.eraser) {
            const pos = startPos.current
            if (!pos) return
            svgPath.current = `M ${pos.x} ${pos.y} L ${pos.x} ${pos.y}`
            fn()
        }



    }, [handleMove, currUseTool, pushSvgDataItem, getSvgDataItem, dispatch])

    // 鼠标按下的事件
    const handleStartDraw = useCallback((ev: any) => {
        const pos = startPos.current = getFixPos({
            x: ev.clientX || ev.touches?.[0].clientX,
            y: ev.clientY || ev.touches?.[0].clientY
        })
        svgPath.current = `M ${pos.x} ${pos.y}`
        window.addEventListener('mousemove', handleMove, false)
        window.addEventListener('touchmove', handleMove, false)
        window.addEventListener('mouseup', handleMouseUp, false)
        window.addEventListener('touchend', handleMouseUp, false)
    }, [getFixPos, handleMouseUp, handleMove])

    return {
        handleStartDraw
    }
}


