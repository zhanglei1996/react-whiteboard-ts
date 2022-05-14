import { Toolbar } from "@/pages/Board/utils";

export interface PenItem {
    id: string,
    type: Toolbar,
    strokeWidth: number,
    stroke: string,
    strokeLineJoin: string,
    strokeOpacity: number,
    d: string
}

export type svgDataItem = PenItem