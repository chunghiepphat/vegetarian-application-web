import React, {useContext, useState} from "react";
import "./View.css";
import HomeSidebar from "./HomeSidebar";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import ViewRecipe from "./view/ViewRecipe";
import ViewVideo from "./view/ViewVideo";
import ViewBlog from "./view/ViewBlog";
import ViewUser from "./view/ViewUser";
import {UserContext} from "../../context/UserContext";

const View = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async (api) => {
        setIsLoading(true);
        const response = await fetch(api)
        try {
            if (response.ok) {
                const result = await response.json();
                setData(result);
                setIsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    }

    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <Switch>
                        <Route path="/view/recipe/:id">
                            <ViewRecipe user={user} location={location} data={data}
                                        isLoading={isLoading} isError={isError}
                                        fetchData={fetchData}/> </Route>
                        <Route path="/view/video/:id">
                            <ViewVideo user={user} location={location} data={data}
                                       isLoading={isLoading} isError={isError}
                                       fetchData={fetchData}/> </Route>
                        <Route path="/view/blog/:id">
                            <ViewBlog user={user} location={location} data={data}
                                      isLoading={isLoading} isError={isError}
                                      fetchData={fetchData}/> </Route>
                        <Route path="/view/user/:id"><ViewUser/></Route>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>

    )
}

export default View;