import React, {useState} from "react";
import "./Home.css";
import {Redirect, Route, Switch} from "react-router-dom";
import HomeSidebar from "./HomeSidebar";
import BrowseRecipes from "./browse/BrowseRecipes";
import BrowseVideos from "./browse/BrowseVideos";
import BrowseBlogs from "./browse/BrowseBlogs";

const Browse = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async (api) => {
        setIsLoading(true);
        const response = await fetch(api).catch(error => {
            console.error(error);
            setIsError(true);
        });
        if (response.ok) {
            const result = await response.json();
            setData(result.listResult);
            setIsLoading(false);
        } else if (response.status >= 400 && response.status < 600) {
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
                            <BrowseRecipes data={data} isLoading={isLoading} isError={isError} fetchData={fetchData}/>
                        </Route>
                        <Route exact path="/browse/videos">
                            <BrowseVideos data={data} isLoading={isLoading} isError={isError} fetchData={fetchData}/>
                        </Route>
                        <Route exact path="/browse/blogs">
                            <BrowseBlogs data={data} isLoading={isLoading} isError={isError} fetchData={fetchData}/>
                        </Route>
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