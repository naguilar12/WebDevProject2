import React, {Component} from 'react';


export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleTextChange(e) {
        this.props.onTextChange(e.target.value);

    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.props.onChange();
        }
    }

    render() {

        return (
            <div className="container-fluid">
                <input type="text" className="foodSearchInput" value={this.props.searchValue}
                       onChange={this.handleTextChange} onKeyPress={this.handleKeyPress}/>
                <button className="searchFoodButton btn btn-primary" onClick={this.props.onChange}>Search</button>
            </div>
        );
    }
}