import React, {Component} from 'react';

/**
 * This class renders the card for showing the list of al food items returned by the search
 */
export default class Card extends Component {

    render() {
        return (
            <div className='card' onClick={this.props.handleCardClick.bind(this,this.props.id)}>
                <div className="card-body">
                    <h5>{this.props.name.toLowerCase()}</h5>
                </div>
            </div>
        );
    }
}