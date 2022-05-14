import { useCallback, useEffect } from "react"
import { rafThrottle } from "../../../utils"
import { useDispatch, useSelector } from "react-redux"
import { PosType, selectPos, setPos as _setPos } from "../store/board.slice"

/** 处理页面滚动 */
export const useScroll = () => {

    const pos = useSelector(selectPos)

    const dispatch = useDispatch()

    const setPos = useCallback((value: PosType) => dispatch(_setPos(value)), [dispatch])

    useEffect(() => {
        window.addEventListener('wheel', handleWindowWheel, { passive: false })
        window.addEventListener('touchmove', handleWindowWheel, { passive: false })
        return () => {
            window.removeEventListener('wheel', handleWindowWheel)
            window.removeEventListener('touchmove', handleWindowWheel)
        }
    }, [])

    /** 阻止浏览器默认的滚动行为，例如mac的双指回退页面 */
    const handleWindowWheel = (e: WheelEvent | TouchEvent) => {
        e.preventDefault()
    }

    const handleScroll = rafThrottle(useCallback((ev: any) => {
        ev.preventDefault()
        ev.stopPropagation()
        const deltaY = ev.deltaY;
        const deltaX = ev.deltaX;
        const { x, y } = pos
        setPos({
            x: x - deltaX,
            y: y - deltaY
        })
    },
        [pos, setPos]
    ))



    return {
        handleScroll,
        ...pos
    }
}