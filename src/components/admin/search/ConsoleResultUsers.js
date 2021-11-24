import React from "react";
import LocalizedStrings from "react-localization";
import Panel from "../../commons/elements/containers/Panel";
import UserCard from "../elements/UserCard";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";


const ManageUsers = ({data}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            messageEmpty: "There were no recipes matching your criteria.",
        },
        vi: {
            messageEmpty: "Không có công thức nào khớp với tìm kiếm của bạn.",
        }
    });

    return (
        <section>
            <div className="section-content">
                <Panel>
                    {data && data.length > 0 ?
                        data.map(item => (
                            <UserCard key={item.id}
                                      id={item.id}
                                      isActive={item.is_active}
                                      avatar={item.profile_image}
                                      firstName={item.first_name}
                                      lastName={item.last_name}
                                      email={item.email}
                                      country={item.country}
                                      role={item.role}/>))
                        : <PanelEmp message={strings.messageEmpty}/>}
                </Panel>
            </div>
        </section>
    )
}

export default ManageUsers;