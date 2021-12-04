import React, {useContext} from "react";
import {postDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {Link, Redirect} from "react-router-dom";
import InputGroup from "../../commons/elements/form/InputGroup";
import {FaAngleRight} from "react-icons/fa";

const FinishPost = ({articleId, type}) => {
    // Localizations
    postDisplayStrings.setLanguage(useContext(LocaleContext));

    if (articleId) {
        return (
            <section>
                <header className="section-header">
                    <h1>{postDisplayStrings.postFinish}</h1>
                </header>
                <div className="section-content" style={{marginTop: "160px"}}>
                    <InputGroup>
                        <Link to="/home" className="button-link button-light">
                            {postDisplayStrings.postBackToHome} <FaAngleRight/></Link>
                        <Link to={`/view/${type}/${articleId}`} className="button-link button-dark">
                            {postDisplayStrings.postGoToArticle} <FaAngleRight/></Link>
                    </InputGroup>
                </div>
            </section>
        )
    } else return <Redirect to="/home"/>
}
export default FinishPost;