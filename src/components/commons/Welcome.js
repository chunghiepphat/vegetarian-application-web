import React from "react";
import "./Welcome.css";
import SearchForm from "./SearchForm";
import Nav from "./Nav";
import Link from "./Link";

class Welcome extends React.Component {
    render() {
        return (
            <section className="home-welcome">
                <h1>Find recipes, how-to videos and more</h1>
                <SearchForm placeholder="You name it, we'll find it."/>
                <Nav>
                    <div>
                        <Link url="#">Category 1</Link>
                        <Link url="#">Category 2</Link>
                        <Link url="#">Category 3</Link>
                    </div>
                    <div>
                        <Link url="#">Advanced search</Link>
                    </div>
                </Nav>
            </section>
        )
    }
}

export default Welcome;