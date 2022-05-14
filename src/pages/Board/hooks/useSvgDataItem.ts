import { svgDataItem } from "@/types/svg"
import { getRandomId } from "@/utils"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrUseTool, selectStroke, selectStrokeOpacity, selectStrokeWidth, selectSvgData, selectSvgHistory, setSvgData } from "../store/board.slice"

/**
 * 获取当前的Path路径基础配置
 */
export const useSvgDataItem = () => {
    const dispatch = useDispatch()
    const stroke = useSelector(selectStroke)
    const strokeWidth = useSelector(selectStrokeWidth)
    const strokeOpacity = useSelector(selectStrokeOpacity)
    const currUseTool = useSelector(selectCurrUseTool)
    const svgData = useSelector(selectSvgData)
    const svgHistory = useSelector(selectSvgHistory)

    const getSvgDataItem = useCallback((d: string) => {
        return {
           id: getRandomId(),
           stroke,
           strokeWidth,
           type: currUseTool,
           strokeLineJoin: 'round',
           strokeOpacity,
           d
        }
    },[currUseTool, stroke, strokeOpacity, strokeWidth]) 

    const pushSvgDataItem = useCallback((data: svgDataItem) => {
        dispatch(setSvgData([...svgData,data]))
        svgHistory.push(svgData)
    }, [dispatch, svgData, svgHistory])

    return {
        getSvgDataItem,
        pushSvgDataItem
    }
}