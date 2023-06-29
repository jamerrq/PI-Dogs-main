import React from 'react';
import './styles.css';

// NavBar Component
import NavBar from '../NavBar';
// Footer Component
import Footer from '../Footer';
// Pagination Component
import Pags from '../Pags';

// Redux
import { connect } from 'react-redux';
import {
    filterByName, firstPage,
    setTotalPages, searchByName,
    clearDogDetail, loadDogs,
    filterByTemperament, filterByOrigin,
    orderBy,
} from '../../Redux/actions';

// withRouter
import { withHistory } from '../withRouter';


class Home extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            aux: 0,
            cards: this.props.filteredDogs,
            currentPage: this.props.currentPage,
            totalPages: Math.ceil(this.props.filteredDogs.length / 8),
            tempFilterTrigger: false,
            originFilterTrigger: false,
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.updateState = this.updateState.bind(this);
        this.filterHandler = this.filterHandler.bind(this);

    };

    updateState = (updatePages = false) => {
        this.setState({
            aux: this.state.aux + 1,
            cards: this.props.filteredDogs,
            currentPage: this.props.currentPage,
            totalPages: this.props.totalPages,
        });
        if (updatePages) {
            this.setState({
                totalPages: Math.ceil(this.props.filteredDogs.length / 8),
            });
        };
    };

    // Handler for the search bar
    changeHandler = async (e) => {

        await this.props.filterByName(e.target.value);
        await this.props.firstPage();
        let newTotalPages = Math.ceil(this.props.filteredDogs.length / 8);
        await this.props.setTotalPages(newTotalPages);
        this.updateState();

    };

    // Handler for the search button
    searchHandler = async (name) => {
        await this.props.clearDogDetail();
        // console.log('HERE!');
        try {
            await this.props.searchByName(name);
        }
        catch (err) {
            // console.log('ERROR:', err);
            alert('Dog not found');
            await this.props.clearDogDetail();
            await this.props.loadDogs();
            await this.props.firstPage();
            this.updateState();
            return 1;
        }
        if (this.props.dogDetail.id) {
            let id = this.props.dogDetail.idApi || this.props.dogDetail.id;
            // navigate to detail page
            this.props.history.push(`/detail/${id}`);
        } else {
            alert('Dog not found');
        };

        // change state
        this.updateState();
        this.props.clearDogDetail();
        this.props.loadDogs();
        this.props.firstPage();

    };

    // Handler for the filters
    filterHandler = async (type, value) => {
        switch (type) {
            case 'temperament':
                if (this.state.tempFilterTrigger) {
                    await this.props.loadDogs();
                    if (this.state.originFilterTrigger) {
                        await this.props.filterByOrigin(
                            this.props.originFilter
                        );
                    };
                    await this.props.firstPage();
                    this.setState({
                        tempFilterTrigger: false,
                    });
                };
                await this.props.filterByTemperament(value);
                this.setState({
                    tempFilterTrigger: true,
                });
                this.updateState(true);
                break;
            case 'origin':
                if (this.state.originFilterTrigger) {
                    await this.props.loadDogs();
                    if (this.state.tempFilterTrigger) {
                        await this.props.filterByTemperament(
                            this.props.tempFilter
                        );
                    };
                    await this.props.firstPage();
                    this.setState({
                        originFilterTrigger: false,
                    });
                };
                await this.props.filterByOrigin(value);
                this.updateState(true);
                this.setState({
                    originFilterTrigger: true,
                });
                break;
            default:
                break;
        };
    };

    // Handler for sorters
    sortHandler = async (type, value) => {
        console.log('type:', type, 'value:', value);
        let order = [type, value].join(',');
        await this.props.orderBy(order);
        this.updateState(true);
    };

    // Delete card handler
    deleteHandler = async (id) => {
        await this.props.deleteDog(id);
        await this.props.loadDogs();
        this.updateState(true);
    };


    render() {

        return (
            <div className='home'>
                <NavBar
                    handleSearch={this.changeHandler}
                    searchHandler={this.searchHandler}
                    filterHandler={this.filterHandler}
                    sortHandler={this.sortHandler}
                />
                <Pags
                    cards={this.state.cards}
                    currentPage={this.state.currentPage}
                    totalPages={this.state.totalPages}
                    updateState={this.updateState}
                ></Pags>
                <Footer />
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
        tempFilter: state.filterByTemperament,
        originFilter: state.filterByOrigin,
        filterByName: state.filterByName,
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        dogDetail: state.dogDetail,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        filterByName: (name) => dispatch(filterByName(name)),
        firstPage: () => dispatch(firstPage()),
        setTotalPages: (totalPages) => dispatch(setTotalPages(totalPages)),
        searchByName: (name) => dispatch(searchByName(name)),
        clearDogDetail: () => dispatch(clearDogDetail()),
        loadDogs: () => dispatch(loadDogs()),
        filterByTemperament: (temperament) =>
            dispatch(filterByTemperament(temperament)),
        filterByOrigin: (origin) => dispatch(filterByOrigin(origin)),
        orderBy: (order) => dispatch(orderBy(order)),
    };
};


export default withHistory(connect(mapStateToProps, mapDispatchToProps)(Home));
