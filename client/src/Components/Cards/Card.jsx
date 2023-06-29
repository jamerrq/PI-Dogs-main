import React from 'react';
import './styles.css';

// Navlink to link to the details page
import { NavLink } from 'react-router-dom';

// Icons
import { TbListDetails } from 'react-icons/tb';


class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Card State
            card: this.props.card,
        };
    };

    render() {
        return (
            <div className='card'>
                <div className="card-img-div">
                    <img src={this.state.card.image}
                        alt={this.state.card.name} />
                </div>
                <div className="card-btn-div">
                    <NavLink to={`/detail/${this.state.card.id}`}>
                        <button className='card-btn'>
                            <TbListDetails />
                        </button>
                    </NavLink>
                </div>
                <div className="card-info-div">
                    <h3>{this.state.card.name}</h3>
                    <hr />
                    <p className='temperaments'>
                        {this.state.card.temperament}
                    </p>
                </div>
            </div>
        );
    };
};


export default Card;
