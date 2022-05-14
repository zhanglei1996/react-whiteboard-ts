import { svgDataItem } from "@/types/svg";
import Stack from "@/utils/Stack";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../sotre";
import { Toolbar } from "../utils";

export interface PosType {
    x: number,
    y: number
}

interface State {
    // svg相对于屏幕的位置
    pos: PosType;
    // 当前使用的工具
    currUseTool: Toolbar;
    // 是否在移动画布
    isMove: boolean;
    // 当前正在画的内容
    curDrawPath: svgDataItem;
    // 画笔颜色
    stroke: string;
    // 画笔粗细
    strokeWidth: number,
    // 画笔透明度
    strokeOpacity: number,
    // svg笔画数组
    svgData: svgDataItem[],
    // 历史记录
    svgHistory: Stack<svgDataItem[]>
}

const initialCurPath: svgDataItem = {
    id: 'curPath',
    type: Toolbar.pen,
    strokeWidth: 2,
    stroke: '',
    strokeLineJoin: 'round',
    strokeOpacity: 1,
    d: ''
}


const initialState: State = {
    pos: {
        x: 0,
        y: 0
    },
    currUseTool: Toolbar.pen,
    isMove: false,
    curDrawPath: initialCurPath,
    stroke: '#2b90ef', //画笔颜色
    strokeWidth: 3,
    strokeOpacity: 1,
    svgData: [],
    svgHistory: new Stack<svgDataItem[]>()
}

export const boardSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        setPos(state: State, action) {
            state.pos = action.payload
        },
        setCurrUseTool(state: State, action) {
            state.currUseTool = action.payload
        },
        setIsMove(state: State, action) {
            state.isMove = action.payload
        },
        setCurDrawPath(state: State, action) {
            state.curDrawPath = action.payload
        },
        setStroke(state: State, action) {
            state.stroke = action.payload
        },
        setStrokeWidth(state: State, action) {
            state.strokeWidth = action.payload
        },
        setStrokeOpacity(state: State, action) {
            state.strokeOpacity = action.payload
        },
        setSvgData(state: State, action) {
            state.svgData = action.payload
        },
    }
})

export const selectPos = (state: RootState) => state.board.pos
export const selectCurrUseTool = (state: RootState) => state.board.currUseTool
export const selectIsMove = (state: RootState) => state.board.isMove
export const selectCurDrawPath = (state: RootState) => state.board.curDrawPath
export const selectStroke = (state: RootState) => state.board.stroke
export const selectStrokeWidth = (state: RootState) => state.board.strokeWidth
export const selectStrokeOpacity = (state: RootState) => state.board.strokeOpacity
export const selectSvgData = (state: RootState) => state.board.svgData
export const selectSvgHistory = (state: RootState) => state.board.svgHistory

export const { setPos, setCurrUseTool, setIsMove, setCurDrawPath, setStroke, setStrokeWidth, setStrokeOpacity, setSvgData } = boardSlice.actions
