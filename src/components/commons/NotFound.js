import React from "react";
import "./NotFound.css";
import errorImage from "assets/error-side-image.png";

const NotFound = () => {
    return (
        <div className="page-container">
            <div className="grid-container">
                <main className="main-full">
                    <div className="error-display">
                        <h1>Four-Oh-Four.</h1>
                        <p>It seems the page you're looking for has sneakily snuck away. We are sorry about that.</p>
                        <em className="error-message">Error 404: Page not found.</em>
                        <img src={errorImage} className="error-image" alt=""/>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default NotFound;