import React from 'react';
import './styles.css';

// Navlink to link to the details page
import { NavLink } from 'react-router-dom';

// Icons
import { TbListDetails } from 'react-icons/tb';
import { RiDeleteBin5Line } from 'react-icons/ri';

// Redux
import { connect } from 'react-redux';

// Actions
import { deleteDog } from '../../Redux/actions';


class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Card State
            card: this.props.card,
        };
        this.ownDeleteDog = this.ownDeleteDog.bind(this);
    };

    ownDeleteDog = (id) => {
        this.props.deleteDog(id);
        this.props.updateState(true);
    };

    render() {
        // console.log(this.state.card);
        let origin = isNaN(this.state.card.id) ? 'api' : 'db';
        // console.log('origin: ', origin);
        // console.log('id: ', this.state.card.id);
        // console.log('isNaN: ', isNaN(this.state.card.id));
        let cardClass = 'card' + (origin !== 'db' ? ' bd' : '');
        let splitTemperaments = this.state.card.temperament?.split(', ');
        let ntemperaments = splitTemperaments?.length;
        const maxTemperaments = 10;
        if (ntemperaments > maxTemperaments) {
            splitTemperaments = splitTemperaments.slice(0, maxTemperaments);
            splitTemperaments.push('...');
        };
        return (
            <div className={cardClass}>
                <div className="card-img-div">
                    <img src={this.state.card.image}
                        alt={this.state.card.name} />
                </div>
                <div className="card-btn-div">
                    <NavLink to={`/detail/${this.state.card.id}`}>
                        <button
                            className='card-btn'
                            aria-label='details-button'
                        >
                            <TbListDetails />
                        </button>
                    </NavLink>
                    {
                        origin !== 'db' &&
                        <button
                            id="delete-btn"
                            className='card-btn'
                            aria-label='delete-button'
                            onClick={() =>
                                this.ownDeleteDog(this.state.card.id)}
                        >
                            <RiDeleteBin5Line />
                        </button>
                    }
                </div>
                <div className="card-info-div">
                    <h3>{this.state.card.name}</h3>
                    <div id="card-temperaments-container">
                        {
                            splitTemperaments?.map((temperament, index) => {
                                return (
                                    <h4 className={"temp-individual-container i" + index}
                                        key={index} > {temperament}</h4>
                                );
                            })
                        }
                    </div>
                </div>
            </div >
        );
    };
};


const mapStateToProps = (state) => {
    return {
        allDogs: state.allDogs,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteDog: (id) => dispatch(deleteDog(id)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Card);
