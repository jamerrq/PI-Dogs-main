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

    constructor(props) {
        super(props);
        this.ownSearchHandler = this.ownSearchHandler.bind(this);
        this.ownFilterHandler = this.ownFilterHandler.bind(this);
        this.ownSortHandler = this.ownSortHandler.bind(this);
    };

    ownSearchHandler = () => {
        // sent the name attribute of the input to the handler
        let searchInput = document.getElementById('search-input');
        this.props.searchHandler(searchInput.value);
        searchInput.value = '';
    };

    ownFilterHandler = (e) => {
        let type = e.target.name;
        let value = e.target.value;
        this.props.filterHandler(type, value);
    };

    ownSortHandler = () => {
        let type = document.getElementById('sorter').value;
        let order = document.getElementById('order').value;
        this.props.sortHandler(type, order);
    };

    render() {
        return (
            <div className='navbar'>
                <div className="search-side">
                    <input
                        type="text" id="search-input"
                        onChange={this.props.handleSearch}
                    />
                    <button
                        id="search-button"
                        onClick={this.ownSearchHandler}
                        aria-label='search-button'
                    >
                        <TbSearch />
                    </button>
                </div>
                <div className="filters">
                    <div className="filter-div">
                        <label htmlFor="temp-filter">Temperament</label>
                        <select
                            name="temperament"
                            id="temp-filter"
                            onChange={this.ownFilterHandler}
                            value={this.props.filterByTemperament}
                        >
                            <option value="all">All</option>
                            {this.props.temperaments.sort().map((temp, index) => {
                                return (
                                    <option key={index} value={temp}>
                                        {temp}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="filter-div">
                        <label htmlFor="origin-filter">Origin</label>
                        <select
                            name="origin"
                            id="origin-filter"
                            onChange={this.ownFilterHandler}
                            value={this.props.filterByOrigin}
                        >
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
                            <select
                                name="sorter"
                                id="sorter"
                                onChange={this.ownSortHandler}
                                value={this.props.orderBy.split(',')[0]}
                            >
                                <option value="name">Name</option>
                                <option value="weight">Weight</option>
                                <option value="height">Height</option>
                                <option value="life_span">Life Span</option>
                                {/* <option value="default">Default</option> */}
                            </select>
                            <select
                                name="order"
                                id="order"
                                onChange={this.ownSortHandler}
                                value={this.props.orderBy.split(',')[1]}
                            >
                                <option value="asc">Asc</option>
                                <option value="desc">Desc</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='right-side'>
                    <NavLink to="/create">
                        <button id="create-button">
                            CREAR <BiAddToQueue />
                        </button>
                    </NavLink>
                    <NavLink to="/">
                        <button
                            id="logout-button"
                            aria-label='logout-button'
                        >
                            SALIR <FaDoorOpen />
                        </button>
                    </NavLink>
                </div>
            </div>
        );
    };

};


const mapStateToProps = (state) => {
    return {
        temperaments: state.temperaments,
        allDogs: state.allDogs,
        filteredDogs: state.filteredDogs,
        orderBy: state.orderBy,
        filterByTemperament: state.filterByTemperament,
        filterByName: state.filterByName,
        filterByOrigin: state.filterByOrigin,
    };
};


export default connect(mapStateToProps)(NavBar);
