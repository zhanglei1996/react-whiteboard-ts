import { svgDataItem } from "@/types/svg";
import React from "react";
import { useSelector } from "react-redux";
import Line from "./components/line";
import Path from "./components/path";
// import Text from "./components/text";
import { useScroll } from "./hooks/useScroll";
import { useTool } from "./hooks/useTool";
import { selectCurDrawPath, selectSvgData } from "./store/board.slice";
import { Toolbar } from "./utils";

export default function BoardApp() {
  const { x, y, handleScroll } = useScroll()
  const { cursorClass, handleMouseDown } = useTool()
  const curDrawPath = useSelector(selectCurDrawPath)

  const svgData = useSelector(selectSvgData)

  const renderSvg = (item: svgDataItem) => {
    switch (item.type) {
      case Toolbar.pen:
      case Toolbar.eraser:
        return <Path key={item.id} data={item} />
      case Toolbar.line:
        return <Line key={item.id} data={item} />
    }
  }

  return (
    <svg id="whiteboard" className={cursorClass} width={'100%'} height={'100%'} onWheel={handleScroll} onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
      <g id="whiteboard-main" transform={`translate(${x},${y})`}>
        <g id="layer-0"></g>
        <g id="layer-1">
          {svgData.map(item => {
            return renderSvg(item)
          })}
          {/* <Text /> */}
          {renderSvg(curDrawPath)}
        </g>
        <g id="layer-2"></g>
        <g id="layer-selected"></g>
      </g>
    </svg>
  );
}


