import React from "react";
import "./Panel.css";

const Panel = (props) => {
    return (
        <div className="panel">
            {props.children}
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
            <div className={`flex-filler ${props.filler}`}/>
        </div>
    )
}

export default Panel;