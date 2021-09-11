import React from "react";
import "./SearchForm.css";

class SearchForm extends React.Component {
    render() {
        return (
            <form class="form-search">
                <input type="text" name="" placeholder={this.props.placeholder}/>
            </form>)
    }
}

export default SearchForm;