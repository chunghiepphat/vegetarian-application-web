import React from "react";
import "./Category.css";
import Deck from "../commons/Deck";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";

const Category = (props) => {
    return (
        <section className="home-section">
            <header>
                <h1>{props.header}</h1>
                <Link to={props.to}><FaAngleRight/>See more</Link>
            </header>
            <Deck/>
        </section>
    )
}

export default Category;