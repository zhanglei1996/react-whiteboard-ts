import { useCallback } from "react"
import { useSelector } from "react-redux"
import { selectCurrUseTool, selectIsMove } from "../store/board.slice"
import { Toolbar } from "../utils"
import { useDbTouch } from "./useDbTouch"
import { useDraw } from "./useDraw"
import { useToolHand } from "./useToolHand"

const getCursorClass = (currUseTool: Toolbar, isMove: boolean) => {
    switch (currUseTool) {
        case Toolbar.pen:
            return 'cursor-draw'
        case Toolbar.hand:
            return isMove ? 'cursor-grabbing' : 'cursor-grab'
        case Toolbar.line:
            return 'cursor-crosshair'
        case Toolbar.eraser:
            return 'cursor-eraser'
        case Toolbar.text:
            return 'cursor-text'
        default:
            return ''
    }
}

/** 画板操作 */
export const useTool = () => {

    const currUseTool = useSelector(selectCurrUseTool)
    const isMove = useSelector(selectIsMove)
    
    const { handleToolHand } = useToolHand()
    const { handleDbTouch } = useDbTouch()
    const { handleStartDraw } = useDraw()

    const handleMouseDown = useCallback((ev: any) => {
        handleDbTouch(ev)
        switch (currUseTool) {
            case Toolbar.hand:
                handleToolHand(ev)
                break;
            case Toolbar.pen:
            case Toolbar.eraser:
            case Toolbar.line:
                handleStartDraw(ev)
                break;
            default:

            break
        } 
    }, [currUseTool, handleToolHand, handleDbTouch, handleStartDraw])

    return {
        cursorClass: getCursorClass(currUseTool, isMove),
        handleMouseDown
    }
}

