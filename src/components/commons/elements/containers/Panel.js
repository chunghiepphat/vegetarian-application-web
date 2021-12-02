import React from "react";
import "./Panel.css";

const Panel = (props) => {
    return (
        <div className={`panel${props.className ? ` ${props.className}` : ``}`} style={props.style}>
            {props.children}
            {props.filler && <>
                <div className={`flex-filler${props.filler ? ` ${props.filler}` : ``}`}/>
                <div className={`flex-filler${props.filler ? ` ${props.filler}` : ``}`}/>
                <div className={`flex-filler${props.filler ? ` ${props.filler}` : ``}`}/>
                <div className={`flex-filler${props.filler ? ` ${props.filler}` : ``}`}/>
                <div className={`flex-filler${props.filler ? ` ${props.filler}` : ``}`}/>
                <div className={`flex-filler${props.filler ? ` ${props.filler}` : ``}`}/>
            </>}
        </div>
    )
}

export default Panel;