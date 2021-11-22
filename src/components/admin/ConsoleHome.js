import React, {useContext, useEffect, useState} from "react";
import LocalizedStrings from "react-localization";
import OverviewCard from "./elements/OverviewCard";
import Panel from "../commons/elements/containers/Panel";
import {apiUrl} from "../../helpers/Variables";
import {UserContext} from "../../context/UserContext";


const ConsoleHome = () => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            pendingRecipes: "Pending recipes",
            pendingVideos: "Pending videos",
            pendingBlogs: "Pending blogs",
            review: "Review",
            categories: "Categories",
            members: "Members",
            manage: "Manage",
        },
        vi: {
            pendingRecipes: "Công thức mới",
            pendingVideos: "Video mới",
            pendingBlogs: "Bài viết mới",
            review: "Duyệt",
            categories: "Danh mục",
            members: "Thành viên",
            manage: "Quản lý",

        }
    });
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [recipeCount, setRecipeCount] = useState(0);
    const [videoCount, setVideoCount] = useState(0);
    const [blogCount, setBlogCount] = useState(0);
    const [count, setCount] = useState(0);
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Gets numbers of pending articles
    const fetchData = async () => {
        // Generates request
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiUrl}/user/count/noapprove`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                const result = await response.json();
                setRecipeCount(result.numberRecipes);
                setVideoCount(result.numberVideo);
                setBlogCount(result.numberBlogs);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchData();
    }, [user]);
    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section>
            <div className="console-content">
                <Panel filler="overview-card">
                    <OverviewCard url={"/console/manage-content/recipes"}
                                  number={recipeCount} text={strings.pendingRecipes} action={strings.review}/>
                    <OverviewCard url={"/console/manage-content/videos"}
                                  number={videoCount} text={strings.pendingVideos} action={strings.review}/>
                    <OverviewCard url={"/console/manage-content/blogs"}
                                  number={blogCount} text={strings.pendingBlogs} action={strings.review}/>
                </Panel>
                <Panel filler="overview-card">
                    <OverviewCard url={"/console/manage-categories"}
                                  text={strings.categories} action={strings.manage}/>
                    <OverviewCard url={"/console/manage-members"}
                                  text={strings.members} action={strings.manage}/>
                </Panel>
            </div>
        </section>
    )
}

export default ConsoleHome;