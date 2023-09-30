import React from "react";

// function Triangle({ x1, y1, x2, y2, x3, y3 }) {
//     const triangleStyle = {
//         position: "absolute",
//         width: 0,
//         height: 0,
//         borderLeft: `${Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}px solid transparent`,
//         borderRight: `${Math.sqrt((x3 - x1) ** 2 + (y3 - y1) ** 2)}px solid transparent`,
//         borderBottom: `${Math.sqrt((x3 - x2) ** 2 + (y3 - y2) ** 2)}px solid blue`, // You can change the color here
//         // marginLeft: `${x1}px`,
//         // marginTop: `${y1}px`,
//     };

//     return <div className="triangle" style={triangleStyle}></div>;
// }

function Triangle({ x1, y1, x2, y2, x3, y3, rgba, width, height }) {
    return (
        <svg width={width} height={height} style={{ position: "absolute" }}>
            <polygon points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill={rgba ? rgba : "#FF6F93"} />
        </svg>
    );
}

export default Triangle;
