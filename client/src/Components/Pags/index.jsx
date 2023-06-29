import React from 'react';
import './styles.css';


// Connect to Redux
import { connect } from 'react-redux';

// Actions
import {
    loadDogs, loadTemperaments,
    prevPage, nextPage,
    firstPage, lastPage,
} from '../../Redux/actions';

// Cards Component
import Card from '../Cards/Card';

// const IPP = 8; // Items per Page
class Pags extends React.Component {

    handlePrevPageEvent() {
        this.props.prevPage();
    };

    handleNextPageEvent() {
        this.props.nextPage();
    };

    render() {
        return (
            <div className='pags'>

                <div id="cards-container">
                    <div className='cards'>
                        {this.props.cards?.slice(this.props.currentPage * 8 - 8, this.props.currentPage * 8)
                            .map((card) => (
                                <Card card={card} key={card.id} />
                            ))}
                    </div>
                </div>

                <div id="pagination-bar">
                    <button
                        id="first-button"
                        disabled={this.props.currentPage === 1}
                        onClick={() => this.props.firstPage()}
                    >
                        ⇑
                    </button>
                    <button
                        id="prev-button"
                        disabled={this.props.currentPage === 1}
                        onClick={() => this.handlePrevPageEvent()}
                    >
                        ↑
                    </button>
                    <span id="page-indicator">{this.props.currentPage}</span>
                    <button
                        id="next-button"
                        disabled={this.props.currentPage ===
                            this.props.totalPages}
                        onClick={() => this.handleNextPageEvent()}
                    >
                        ↓
                    </button>
                    <button
                        id="last-button"
                        disabled={this.props.currentPage ===
                            this.props.totalPages}
                        onClick={() => this.props.lastPage()}
                    >
                        ⇓
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
        firstPage: () => dispatch(firstPage()),
        lastPage: () => dispatch(lastPage()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Pags);
