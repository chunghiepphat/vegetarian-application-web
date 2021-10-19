import React, {useContext} from "react";
import InputGroup from "../../commons/elements/form/InputGroup";
import {Link, useLocation} from "react-router-dom";
import {UserContext} from "../../../context/UserContext";

const HomeShortcuts = () => {
    const user = useContext(UserContext);
    const location = useLocation();

    return (
        <section>
            {user ?
                <div className="section-content">
                    <InputGroup style={{marginBottom: "10px"}}>
                        <Link className="button-link button-submit" to="/post/recipe">
                            Share a recipe
                        </Link>
                        <Link className="button-link button-submit" to="/post/blog">
                            Share a story
                        </Link>
                    </InputGroup>
                    <InputGroup>
                        <Link className="button-link" to="/menu">
                            Create your menu for this week
                        </Link>
                        <Link className="button-link" to="/post/recipe">
                            Calculate your BMI
                        </Link>
                    </InputGroup>
                </div>
                :
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
