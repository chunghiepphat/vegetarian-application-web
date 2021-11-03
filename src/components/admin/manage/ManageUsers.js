import React from "react";
import UserList from "./users/UserList";

const ManageUsers = () => {
    return (
        <section>
            <header className="console-header">
                <h1>Community members</h1>
            </header>
            <div className="console-content">
                <div className="user-table-header">
                    <div className="card-cell-1"/>
                    <div className="card-cell-2">Name & email</div>
                    <div className="card-cell-3">Country</div>
                    <div className="card-cell-4">Role</div>
                    <div className="card-cell-5">Account status</div>
                </div>
                <UserList/>
            </div>
        </section>
    )
}

export default ManageUsers;