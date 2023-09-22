import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShapeDemo from "./Demo/ShapeDemo";
import { Scrollbar } from "react-scrollbars-custom";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // Function to update window dimensions
        const updateWindowDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add a window resize event listener
        window.addEventListener("resize", updateWindowDimensions);

        // Initial call to set dimensions
        updateWindowDimensions();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []); // Empty dependency array to run this effect only once

    return (
        <>
            {windowDimensions.width > 600 && windowDimensions.height > 600 ? (
                <Scrollbar style={{ width: "100vw", height: "100vh" }}>
                    <Everything_App />
                </Scrollbar>
            ) : (
                <Everything_App />
            )}
        </>
    );
}

let Everything_App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/30pieces" element={<ShapeDemo />} />
                <Route path="/" element={<ShapeDemo />} />
            </Routes>
        </Router>
    );
};

export default App;
