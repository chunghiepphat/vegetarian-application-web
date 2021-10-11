import React from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";

const HomeVideos = () => {
    return (
        <section>
            <header className="section-header linked-header">
                <h1>Latest how-to videos</h1>
                <Link to="/browse/videos"><FaAngleRight/>See more</Link>
            </header>
        </section>
    )
}

export default HomeVideos;