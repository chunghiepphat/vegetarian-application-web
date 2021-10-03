import React from "react";

const UpdateAvatar = () => {
    return (
        <section>
            <header className="section-header">
                <h1>Profile picture</h1>
            </header>
            <div className="section-content">
                <form className="form-container">
                    {/*Profile picture*/}
                    <label>
                        <span>Profile image</span>n>
                        <input type="file"/>
                    </label>
                    <button>Update</button>
                </form>
            </div>
        </section>
    )
}

export default UpdateAvatar;