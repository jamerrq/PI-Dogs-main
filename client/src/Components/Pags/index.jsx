import React from 'react';
import './styles.css';


// Connect to Redux
import { connect } from 'react-redux';

// Actions
import {
    loadDogs, loadTemperaments,
    prevPage, nextPage
} from '../../Redux/actions';

// Cards Component
import Card from '../Cards/Card';


class Pags extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Page State
            currentPage: this.props.currentPage,
            // Items per Page
            itemsPerPage: 8,
            // Total Pages
            // totalPages: this.props.filteredDogs.length / 8,
            totalPages: 0,
        };
        let startIndex = this.state.currentPage * this.state.itemsPerPage - 8;
        let endIndex = this.state.currentPage * this.state.itemsPerPage;
        this.state.cards = this.props.filteredDogs.slice(startIndex, endIndex);
        // console.log(this.props);
        // console.log('Pags state:', this.state);
        this.getCards = this.getCards.bind(this);
    };

    componentDidMount() {
        // console.log(this.props.filteredDogs.length);
        this.setState({
            totalPages: Math.ceil(this.props.filteredDogs.length / 8),
            // cards: this.props.filteredDogs.slice(0, 8),
        });
    };

    handlePrevPageEvent() {
        let newStart = this.state.currentPage * this.state.itemsPerPage - 16;
        let newEnd = this.state.currentPage * this.state.itemsPerPage - 8;
        // console.log(this.props.filteredDogs.slice(newStart, newEnd));
        this.setState({
            currentPage: this.state.currentPage - 1,
            cards: this.props.filteredDogs.slice(newStart, newEnd),
        });
        this.props.prevPage();
        // console.log(this.props);
        // console.log(this.state);
    };

    handleNextPageEvent() {
        let newStart = this.state.currentPage * this.state.itemsPerPage;
        let newEnd = this.state.currentPage * this.state.itemsPerPage + 8;
        // console.log(this.props.filteredDogs.slice(newStart, newEnd));
        this.setState({
            currentPage: this.state.currentPage + 1,
            cards: this.props.filteredDogs.slice(newStart, newEnd),
        });
        this.props.nextPage();
        // console.log(this.props);
        // console.log(this.state);
    };

    getCards() {
        return this.state.cards;
    };

    render() {
        return (
            <div className='pags'>

                {/* {console.log(this.state.cards)} */}

                <div id="cards-container">
                    <div className='cards'>
                        {this.state.cards?.map((card) => (
                            <Card card={card} key={card.id} />
                        ))}
                    </div>
                </div>

                <div id="pagination-bar">
                    <button
                        id="prev-button"
                        disabled={this.state.currentPage === 1}
                        onClick={() => this.handlePrevPageEvent()}
                    >
                        ↑
                    </button>
                    <span id="page-indicator">{this.state.currentPage}</span>
                    <button
                        id="next-button"
                        disabled={this.state.currentPage === this.state.totalPages}
                        onClick={() => this.handleNextPageEvent()}
                    >
                        ↓
                    </button>
                </div>
            </div>
        );
    };

};


const mapStateToProps = (state) => {
    return {
        // Filtered Cards
        filteredDogs: state.filteredDogs,
        currentPage: state.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTemperaments: () => dispatch(loadTemperaments()),
        loadDogs: () => dispatch(loadDogs()),
        prevPage: () => dispatch(prevPage()),
        nextPage: () => dispatch(nextPage()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Pags);
