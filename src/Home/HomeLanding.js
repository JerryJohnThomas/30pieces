import React from "react";
import "./HomeLanding.css";
import Button_custom from "./Button";

function HomeLanding() {
    return (
        <>
            <div className="container_fullscreen playFair_text  sd_container1 bg_color7">
                <div className="sd_heading1 font_size3">30 Pieces Replication</div>
                <div className="home_container flexDirection_rowB_cols">
                    <div className="roboto_text flex_center flexDirection_col  font_size_2_3">
                        <div className="button_pre_text font_size_2_4">How To Make a Triangle</div>
                        <Button_custom text="here" url="/30pieces" />
                    </div>

                    <div className="roboto_text flex_center flexDirection_col font_size_2_3">
                        <div className="button_pre_text font_size_2_4">NEAT Algo</div>
                        <Button_custom text="here" url="/neat" />
                    </div>

                    <div className="roboto_text flex_center flexDirection_col font_size_2_3">
                        <div className="button_pre_text font_size_2_4">Train with Images</div>
                        <Button_custom text="here" url="/train" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeLanding;
