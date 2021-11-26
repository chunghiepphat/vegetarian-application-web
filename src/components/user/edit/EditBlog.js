import React, {useState} from "react";
import BlogHeader from "../../home/view/blog/BlogHeader";
import EditSubtitle from "./blog/EditSubtitle";
import EditContent from "./blog/EditContent";
import {apiUrl} from "../../../helpers/Variables";
import {Link, useHistory} from "react-router-dom";
import Form from "../../commons/elements/form/Form";
import {FaAngleLeft} from "react-icons/fa";
import InputGroup from "../../commons/elements/form/InputGroup";
import LocalizedStrings from "react-localization";

const EditBlog = ({id, data}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            gobackButton: "Go back",
            cancelButton: "Cancel",
            finishButton: "Finish",
            menuSaved: "Blog updated successfully!",
            alertAuthorized: "You are not authorized to do that.",
            alertError: "Unexpected error with code: ",
        },
        vi: {
            gobackButton: "Trở về",
            cancelButton: "Hủy",
            finishButton: "Lưu",
            menuSaved: "Cập nhật bài viết thành công!",
            alertAuthorized: "Bạn không có quyền truy cập.",
            alertError: "Lỗi mã: ",
        }
    });

    const token = JSON.parse(localStorage.getItem("accessToken"));
    const history = useHistory();

    const [subtitle, setSubtitle] = useState(data.blog_subtitle);
    const [content, setContent] = useState(data.blog_content);

    const updatePost = async (e) => {
        e.preventDefault();
        // Generates request headers
        let headers = new Headers();
        if (token) {
            headers.append("Authorization", `Bearer ${token.token}`);
        }
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generates request body
        let body = JSON.stringify({
            "blog_title": data.blog_title,
            "blog_subtitle": subtitle,
            "blog_thumbnail": data.blog_thumbnail,
            "blog_content": content,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/blogs/edit/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert(strings.menuSaved);
            history.push(`/view/blog/${id}`);
        } else if (response.status === 401) {
            alert(strings.alertAuthorized)
        } else {
            alert(strings.alertError + response.status);
        }
    }

    const cancelUpdate = () => {
        history.push(`/view/blog/${id}`);
    }

    return (
        <div className="section-content">
            {/*Recipe article container*/}
            <article>
                {data.blog_thumbnail &&
                <picture className="article-thumbnail">
                    <source srcSet={data.blog_thumbnail}/>
                    <img src="" alt=""/>
                </picture>}
                {/*Recipe title*/}
                <Link to={`/view/blog/${id}`}><FaAngleLeft/>{strings.gobackButton}</Link>
                <BlogHeader data={data}/>
                <Form id="updateForm" onSubmit={updatePost}>
                    <EditSubtitle subtitle={subtitle} setSubtitle={setSubtitle}/>
                    <EditContent content={content} setContent={setContent}/>
                </Form>
            </article>
            <div className="sticky-bottom">
                <InputGroup>
                    <button className="button-light" onClick={cancelUpdate}>{strings.cancelButton}</button>
                    <button type="submit" form="updateForm" className="button-dark">{strings.finishButton}</button>
                </InputGroup>
            </div>
        </div>
    )
}

export default EditBlog;