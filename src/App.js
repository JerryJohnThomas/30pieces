import React from "react";
import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import ShapeDemo from "./Demo/ShapeDemo";
import { Scrollbar } from "react-scrollbars-custom";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import CompareHome from "./ImageComparator/CompareHome";
import HomeLanding from "./Home/HomeLanding";
import NeatHome from "./Neat/NeatHome";
import SynthesizeDemo from "./Neat/SynthesizeDemo";
import NeatHomeGrid from "./Neat/NeatHomeGrid";

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
//change back to normal router once moved away fro m github pages
let Everything_App = () => {
    return (
        <HashRouter>
            {/* <Router> */}
                <Routes>
                    <Route path="/" element={<HomeLanding />} />
                    <Route path="/30pieces" element={<ShapeDemo />} />
                    <Route path="/train" element={<CompareHome />} />
                    <Route path="/neat" element={<NeatHome />} />
                    <Route path="/neat/grid" element={<NeatHomeGrid />} />
                    <Route path="/synthesis" element={<SynthesizeDemo />} />
                    <Route path="*" element={<HomeLanding />} />

                    <Route path="/30pieces/" element={<HomeLanding />} />
                    <Route path="/30pieces/30pieces" element={<ShapeDemo />} />
                    <Route path="/30pieces/train" element={<CompareHome />} />
                    <Route path="/30pieces/neat" element={<NeatHome />} />
                    <Route path="/30pieces/neat/grid" element={<NeatHomeGrid />} />
                    <Route path="/30pieces/synthesis" element={<SynthesizeDemo />} />
                    <Route path="*" element={<HomeLanding />} />
                </Routes>
            {/* </Router> */}
        </HashRouter>
    );
};

export default App;
