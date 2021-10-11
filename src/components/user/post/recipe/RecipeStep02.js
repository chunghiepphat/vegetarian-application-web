import React, {useRef, useState} from "react";
import {useHistory} from "react-router-dom";

const RecipeStep02 = (props) => {
    const history = useHistory();
    const [image, setImage] = useState();
    const inputRef = useRef();

    const uploadImage = () => {
        // const api = "https://api.imgur.com/3/image/{{imageHash}}";
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Client-ID fb0b6f593b4a084");

        const formData = new FormData();
        formData.append("image", image);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        };

        fetch("https://api.imgur.com/3/image", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result.data))
            .catch(error => console.log('error', error));
        console.log(props.thumbnail)
    }

    const nextStep = () => {
        history.push("/post/recipe/images");
    }

    return (
        <section>
            <header className="section-header">
                <h1>Step 1 - Getting started</h1>
                <em>Share with us some details about your new exciting recipe.</em>
            </header>
            <div className="section-content">
                <form className="form-full" onSubmit={nextStep}>
                    <h1>Add a picture</h1>
                    <input aria-label="Recipe-thumbnail" type="file"
                           onChange={() => (inputRef.current.files[0])}
                           ref={inputRef}/>
                    <input aria-label="Resting time" type="number" min={0} value={props.restingTime}
                           onChange={e => props.setRestingTime(e.target.value)}/>
                    <button type="submit">Next step</button>
                </form>
            </div>
        </section>
    )
}

export default RecipeStep02;