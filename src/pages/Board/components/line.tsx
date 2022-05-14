import { svgDataItem } from "@/types/svg";
import React from "react";

export default function Line({ data }: { data: svgDataItem }) {
  return (
    <g id={data.id}>
      <g
        className="free-linker"
        start-point="-39,441.55"
        end-point="100,561.55"
      >
        <path
          className="free-linker-path"
          fill="none"
          stroke={data.stroke}
          strokeWidth={data.strokeWidth}
          d={data.d}
        ></path>
      </g>
      {/* <g className="linker-text">
        <path
          className="free-linker-text-path"
          fill="#F7F9FA"
          stroke="transparent"
          strokeWidth="1"
          d="M4.5 493.04999999999995L56.5 493.04999999999995L56.5 510.04999999999995L4.5 510.04999999999995Z"
        ></path>
      </g> */}
      {/* <foreignObject
        className="foreign-g"
        x="4.5"
        y="493.04999999999995"
        transform="matrix(1, 0, 0, 1, 0, 0)"
        width="52"
        height="17"
      >
        <div
          className="foreign-text"
          contentEditable="false"
        //   xmlns="http://www.w3.org/1999/xhtml"
          style={{
            textAlign: "center",
            justifyContent: "center",
            width: "fit-content",
            height: "auto",
            maxWidth: 280,
            maxHeight: 180,
          }}
        >
          <p>123456</p>
        </div>
      </foreignObject> */}
      <path
        className="free-linker-temp"
        fill="none"
        stroke="transparent"
        d="M-39 441.55L100 561.55"
        strokeWidth="12"
      ></path>
    </g>
  );
}
