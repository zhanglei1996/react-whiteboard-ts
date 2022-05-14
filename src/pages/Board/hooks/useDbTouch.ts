import { useCallback } from "react"
import { useToolHand } from "./useToolHand"

/** 移动端默认加上双指移动画布 */
export const useDbTouch = () => {

    const { handleToolHand } = useToolHand()

    const handleDbTouch = useCallback((ev: TouchEvent) => {
        if(ev.type !== 'touchstart') return
        if(ev.touches.length < 2) return
        handleToolHand(ev)
    }, [handleToolHand])

    return {
        handleDbTouch
    }
}