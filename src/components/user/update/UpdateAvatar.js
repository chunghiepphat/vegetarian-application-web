import React, {useRef, useState} from "react";

const UpdateAvatar = () => {
    const [image, setImage] = useState();
    const inputRef = useRef();
    console.log(image.name)
    const submitImage = (e) => {
        e.preventDefault();

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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return (
        <section>
            <header className="section-header">
                <h1>Profile picture</h1>
            </header>
            <div className="section-content">
                <form className="form-full" onSubmit={submitImage}>
                    {/*Dashboard picture*/}
                    <label>
                        <span>Profile image</span>
                        <input type="file"
                               onChange={() => (setImage(inputRef.current.files[0]))}
                               ref={inputRef}/>
                    </label>
                    <button>Update</button>
                </form>
            </div>
        </section>
    )
}

export default UpdateAvatar;