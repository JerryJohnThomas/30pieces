import React from "react";
function Triangle({ x1, y1, x2, y2, x3, y3, rgba, width, height }) {
    return (
        <svg width={width} height={height} style={{ position: "absolute" }}>
            <polygon points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill={rgba ? rgba : "#FF6F93"} />
        </svg>
    );
}

export default Triangle;
