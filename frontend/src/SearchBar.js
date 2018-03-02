import React, { Component } from 'react';


export default class SearchBar extends Component{
    render() {
        return (
            <div className="container-fluid">
                <input type="text" className="foodSearchInput" />
                <button className="searchFoodButton btn btn-primary">Search</button>
            </div>
    );
    }
}