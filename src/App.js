import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShapeDemo from "./Demo/ShapeDemo";
import { Scrollbar } from "react-scrollbars-custom";
import "./App.css";

function App() {
    return (
        <>
            <Scrollbar
                style={{ width: "100vw", height: "100vh" }}
            >
                <Router>
                    <Routes>
                        <Route path="/30pieces" element={<ShapeDemo />} />
                        <Route path="/" element={<ShapeDemo />} />
                    </Routes>
                </Router>
            </Scrollbar>
        </>
    );
}

export default App;
