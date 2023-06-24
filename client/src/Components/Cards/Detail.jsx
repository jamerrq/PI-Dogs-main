import React from 'react';
import './styles.css';

import { connect } from 'react-redux';

// Navlink to go back to the home page
import { NavLink } from 'react-router-dom';


class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            card: this.props.allDogs?.find(dog => String(dog.id) === this.id || String(dog.idApi) === this.id) || {},
        };
    };

    componentDidMount() {
        // console.log(this.id);
    };

    render() {
        return (
            <div id="detail-container">

                <h3>ID: {this.id}</h3>


                <img src={this.state.card.image || ""} alt={this.state.card.name || ""} />

                <h1>Name: {this.state.card.name}</h1>

                <h3>Height: {this.state.card.height}</h3>

                <h3>Weight: {this.state.card.weight}</h3>

                <h3>Temperaments: {this.state.card.temperament}</h3>

                <h4>Life Span: {this.state.card.life_span}</h4>

                <div id="button-div">
                    <NavLink to='/home'>
                        <button id="back-btn">GO BACK</button>
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
