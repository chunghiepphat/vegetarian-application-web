import React from "react";
import {Link} from "react-router-dom";
import InputGroup from "../../commons/elements/form/InputGroup";

const HomeShortcuts = ({user, location}) => {

    return (
        <section>
            {user ?
                // If user is logged in
                <div className="section-content">
                    <InputGroup style={{marginBottom: "10px"}}>
                        <Link className="button-link button-submit" to="/post/recipe">
                            Share a recipe </Link>
                        <Link className="button-link button-submit" to="/post/blog">
                            Share a story </Link>
                    </InputGroup>
                    <InputGroup>
                        <Link className="button-link" to="/menu">
                            Create your menu for this week </Link>
                        <Link className="button-link" to="/health">
                            Manage your health profile & preferences </Link>
                    </InputGroup>
                </div>
                :
                // Otherwise
                <div className="section-content">
                    <Link className="button-link" to={{
                        pathname: "/login",
                        state: {background: location}
                    }}>
                        Sign in to get access to more features!
                    </Link>
                </div>
            }
        </section>
    )
}

export default HomeShortcuts;
