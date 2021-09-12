import React from "react";
import "./Home.css";
import Banner from "../../../components/home/Banner";
import Welcome from "../../../components/home/Welcome";
import Section from "../../../components/home/Section";

const Home = (props) => {
    console.log(props.location);
    console.log(props.match);
    console.log(props.history);
    return (
        <div>
            <main>
                <Banner/>
                <Welcome/>
                <Section category="recipes" header="Check out these recipes"/>
                <Section category="videos" header="Try these how-to videos"/>
                <Section category="blogs" header="Stories to read"/>
            </main>
        </div>

    )
}

export default Home;