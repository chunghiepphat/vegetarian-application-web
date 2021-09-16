import React, {useRef} from "react";
import "./Deck.css";
import Card from "./Card";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

const Deck = () => {

    const ref = useRef(null);

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    return (

        <div className="card-deck">
            <button class="scroll-left" onClick={() => scroll(-300)}><FaAngleLeft/></button>
            <button class="scroll-right" onClick={() => scroll(300)}><FaAngleRight/></button>
            <div className="card-slider" ref={ref}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}

export default Deck;