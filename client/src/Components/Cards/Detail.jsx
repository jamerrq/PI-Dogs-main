import React from 'react';
import './styles.css';

import { connect } from 'react-redux';

// Navlink to go back to the home page
import { NavLink } from 'react-router-dom';

// Icons
import { BiArrowBack } from 'react-icons/bi';


class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            card: this.props.card ||
                this.props.allDogs?.find(dog => String(dog.id) === this.id ||
                    String(dog.idApi) === this.id) || {},
        };
    };

    render() {

        return (
            <div id="detail-container">

                <h3>
                    ID: {this.id || this.state.card.idApi || this.state.card.id}
                </h3>


                <img src={this.state.card.image || "No image found"}
                    alt={this.state.card.name || "No image found"} />

                <h1>Name: {this.state.card.name || "No name found"}</h1>

                <h3>Height: {this.state.card.height
                    || "No height data found"}</h3>

                <h3>Weight: {this.state.card.weight
                    || "No weight data found"}</h3>

                <h3>Temperaments: {this.state.card.temperament
                    || "No temperament data"}</h3>

                <h4>Life Span: {this.state.card.life_span
                    || "No life span data found"}</h4>

                <div id="button-div">
                    <NavLink to='/home'>
                        <button id="back-btn" aria-label='back-btn'>
                            <BiArrowBack />
                        </button>
                    </NavLink>
                </div>

            </div>
        );

    };

};


const mapStateToProps = (state) => {
    return {
        allDogs: state.allDogs,
    };
};


export default connect(mapStateToProps)(Detail);
