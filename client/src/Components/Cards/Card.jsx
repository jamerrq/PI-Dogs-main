import React from 'react';
import './styles.css';

// Navlink to link to the details page
import { NavLink } from 'react-router-dom';

// Icons
import { TbListDetails } from 'react-icons/tb';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

// Redux
import { connect } from 'react-redux';

// Actions
import { deleteDog } from '../../Redux/actions';


class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            card: this.props.card,
        };
        this.ownDeleteDog = this.ownDeleteDog.bind(this);
    };

    ownDeleteDog = async () => {
        let id = this.state.card.id;
        if (id) {
            await this.props.deleteHandler(id);
        };
    };

    render() {
        let origin = isNaN(this.state.card.id) ? 'api' : 'db';
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
                                this.ownDeleteDog()}
                        >
                            <RiDeleteBin5Line />
                        </button>
                    }
                    {
                        origin !== 'db' &&
                        <NavLink to={`/edit/${this.state.card.id}`}>
                            <button
                                className='card-btn'
                                aria-label='edit-button'
                            >
                                <FiEdit />
                            </button>
                        </NavLink>
                    }
                </div>
                <div className="card-info-div">
                    <h3>{this.state.card.name}</h3>
                    <div id="card-temperaments-container">
                        {
                            splitTemperaments?.map((temperament, index) => {
                                return (
                                    <h4
                                        className=
                                        {"temp-individual-container i" + index}
                                        key={index} > {temperament}
                                    </h4>
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
