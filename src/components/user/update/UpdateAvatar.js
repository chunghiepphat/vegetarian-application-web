import React from "react";

const UpdateAvatar = () => {
    return (
        <section>
            <header className="section-header">
                <h1>Profile picture</h1>
            </header>
            <div className="section-content">
                <form className="form-full">
                    {/*Dashboard picture*/}
                    <label>
                        <span>Profile image</span>
                        <input type="file"/>
                    </label>
                    <button>Update</button>
                </form>
            </div>
        </section>
    )
}

export default UpdateAvatar;