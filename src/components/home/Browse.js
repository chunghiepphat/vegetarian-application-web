import React, {useContext, useState} from "react";
import "./Home.css";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import HomeSidebar from "./HomeSidebar";
import BrowseRecipes from "./browse/BrowseRecipes";
import BrowseVideos from "./browse/BrowseVideos";
import BrowseBlogs from "./browse/BrowseBlogs";
import {UserContext} from "../../context/UserContext";

const Browse = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async (api) => {
        setIsError(false);
        setIsLoading(true);
        try {
            const response = await fetch(api)
            if (response.ok) {
                const result = await response.json();
                setData(result.listResult);
                setIsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
            setIsLoading(false);
        }
    }

    return (
        <div className="page-container">
            <div className="grid-container">
                {/*Main content*/}
                <main>
                    <Switch>
                        <Route exact path="/browse/recipes">
                            <BrowseRecipes data={data} user={user} location={location}
                                           isLoading={isLoading} isError={isError}
                                           fetchData={fetchData}/> </Route>
                        <Route exact path="/browse/videos">
                            <BrowseVideos data={data} user={user} location={location}
                                          isLoading={isLoading} isError={isError}
                                          fetchData={fetchData}/> </Route>
                        <Route exact path="/browse/blogs">
                            <BrowseBlogs data={data} user={user} location={location}
                                         isLoading={isLoading} isError={isError}
                                         fetchData={fetchData}/> </Route>
                        <Route><Redirect to="/not-found"/></Route>
                    </Switch>
                </main>
                {/*Right sidebar*/}
                <HomeSidebar/>
            </div>
        </div>

    )
}

export default Browse;