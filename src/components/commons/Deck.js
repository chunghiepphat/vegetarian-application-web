import React from "react";
import "./Deck.css";
import Card from "./Card";

class Deck extends React.Component {
    render() {
        return (
            <div class="card-deck">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
            </div>
        )
    }
}

export default Deck;