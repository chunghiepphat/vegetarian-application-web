import React from "react";
import "./Section.css";
import Deck from "../commons/Deck";

const Section = () => {
    return (
        <section className="home-section">
            <header>
                <h1>Check out these recipes!</h1>
                <ul>
                    <li><a href="/#">See more</a></li>
                </ul>
            </header>
            <Deck/>
        </section>
    )
}

export default Section;