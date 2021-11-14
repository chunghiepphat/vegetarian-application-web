import React from "react";
import OverviewCard from "./elements/OverviewCard";
import Panel from "../commons/elements/containers/Panel";

const ConsoleHome = () => {
    return (
        <section>
            <div className="console-content">
                <Panel filler="overview-card">
                    <OverviewCard url={"/console/manage-content/recipes"}
                                  number={32} text={"New recipes"} action={"Review"}/>
                    <OverviewCard url={"/console/manage-content/videos"}
                                  number={3} text={"New videos"} action={"Review"}/>
                    <OverviewCard url={"/console/manage-content/blogs"}
                                  number={18} text={"New blogs"} action={"Review"}/>
                </Panel>
                <Panel filler="overview-card">
                    <OverviewCard url={"/console/manage-content/blogs"}
                                  text={"Categories"} action={"Manage"}/>
                    <OverviewCard url={"/console/manage-members/"}
                                  text={"Members"} action={"Manage"}/>
                </Panel>
            </div>
        </section>
    )
}

export default ConsoleHome;