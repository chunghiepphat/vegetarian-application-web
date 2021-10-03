import React from "react";

const UpdatePassword = () => {
    return (
        <section>
            <header className="section-header">
                <h1>Change password</h1>
            </header>
            <div className="section-content">
                <form className="form-container">
                    {/*Password*/}
                    <label>
                        <span>New password</span>
                        <input type="password" placeholder="New password" required/>
                        <input type="password" placeholder="Confirm password" required/>
                        <button>Confirm</button>
                    </label>
                </form>
            </div>
        </section>
    )
}

export default UpdatePassword;