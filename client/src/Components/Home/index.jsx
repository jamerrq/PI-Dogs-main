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
    orderBy, deleteDog, setFilterName
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
        this.deleteHandler = this.deleteHandler.bind(this);

        // this.updateState(true);

    };

    async componentDidMount() {
        // console.log('Home mounted!');
        await this.props.loadDogs();
        // await this.props.firstPage();
        await this.updateState(true);
    };

    updateState = async (updatePages = false) => {
        if (updatePages) {
            let newTotalPages = Math.ceil(this.props.filteredDogs.length / 8);
            this.setState({
                totalPages: newTotalPages,
            });
            await this.props.setTotalPages(newTotalPages);
        };
        this.setState({
            aux: this.state.aux + 1,
            cards: this.props.filteredDogs,
            currentPage: this.props.currentPage,
            totalPages: this.props.totalPages,
        });
        // console.log('STATUS UPDATED!');
    };

    // Handler for the search bar
    changeHandler = async (e) => {

        await this.props.filterByName(e.target.value);
        await this.updateState(true);
        await this.props.firstPage();

    };

    // Handler for the search button
    searchHandler = async (name) => {
        await this.props.clearDogDetail();
        try {
            await this.props.searchByName(name);
        }
        catch {
            // Do nothing
        };
        if (this.props.dogDetail.id) {
            let id = this.props.dogDetail.idApi || this.props.dogDetail.id;
            // navigate to detail page
            this.props.history.push(`/detail/${id}`);
        } else {
            // alert('Dog not found!');
            this.props.history.push(`/notfound`);
            this.props.clearDogDetail();
            this.props.loadDogs();
            this.props.firstPage();
            this.props.setFilterName('');
        };

        // change state
        await this.updateState();
        await this.props.clearDogDetail();
        await this.props.loadDogs();
        await this.props.firstPage();

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
                await this.updateState(true);
                await this.props.firstPage();
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
                await this.updateState(true);
                this.setState({
                    originFilterTrigger: true,
                });
                await this.props.firstPage();
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
        await this.updateState(true);
    };

    // Delete card handler
    deleteHandler = async (id) => {
        await this.props.deleteDog(id);
        await this.props.loadDogs();
        await this.updateState(true);
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
                    deleteHandler={this.deleteHandler}
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
        deleteDog: (id) => dispatch(deleteDog(id)),
        setFilterName: (name) => dispatch(setFilterName(name)),
    };
};


export default withHistory(connect(mapStateToProps, mapDispatchToProps)(Home));
