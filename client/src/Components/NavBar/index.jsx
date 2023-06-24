import React from 'react';
import './styles.css';

// NavLink
import { NavLink } from 'react-router-dom';

// React Icons
import { TbSearch } from 'react-icons/tb';
import { FaDoorOpen } from 'react-icons/fa';
import { BiAddToQueue } from 'react-icons/bi';

// Redux
import { connect } from 'react-redux';
// import { loadTemperaments } from '../../Redux/actions';


class NavBar extends React.Component {

    render() {
        return (
            <div className='navbar'>
                <div className="search-side">
                    <input type="text" id="search-input" />
                    <button id="search-button"><TbSearch /></button>
                </div>
                <div className="filters">
                    <div className="filter-div">
                        <label htmlFor="temp-filter">Temperament</label>
                        <select name="temp-filter" id="temp-filter">
                            <option value="all">All</option>
                            {this.props.temperaments.map((temp, index) => {
                                return (
                                    <option key={index} value={temp}>{temp}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="filter-div">
                        <label htmlFor="origin-filter">Origin</label>
                        <select name="origin-filter" id="origin-filter">
                            <option value="all">All</option>
                            <option value="api">Api</option>
                            <option value="created">Created</option>
                        </select>
                    </div>
                </div>
                <div className='sorters'>
                    <div className="sorter-div">
                        <div id="sorter-label-div">
                            <label htmlFor="sorter">Sort by</label>
                        </div>
                        <div id="sorter-options-div">
                            <select name="sorter" id="sorter">
                                <option value="name">Name</option>
                                <option value="weight">Weight</option>
                                <option value="default">Default</option>
                            </select>
                            <select name="order" id="order">
                                <option value="asc">Asc</option>
                                <option value="desc">Desc</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='right-side'>
                    <NavLink to="/create">
                        <button id="create-button">CREAR <BiAddToQueue /></button>
                    </NavLink>
                    <NavLink to="/">
                        <button id="logout-button">SALIR <FaDoorOpen /></button>
                    </NavLink>
                </div>
            </div>
        );
    };

};


const mapStateToProps = (state) => {
    return {
        temperaments: state.temperaments
    };
};


export default connect(mapStateToProps)(NavBar);
