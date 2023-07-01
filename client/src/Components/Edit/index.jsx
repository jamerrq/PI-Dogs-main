import React from "react";
import './styles.css';
import { connect } from "react-redux";
import { loadDogs, modifyDog } from "../../Redux/actions";

import { NavLink } from 'react-router-dom';

// History
import { withHistory } from '../withRouter';

const validateInput = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = 'NAME IS REQUIRED';
    };
    if (!input.height) {
        errors.height = 'HEIGHT IS REQUIRED';
    };
    if (!input.weight) {
        errors.weight = 'WEIGHT IS REQUIRED';
    };
    if (!input.life_span) {
        errors.life_span = 'LIFE SPAN IS REQUIRED';
    };
    return errors;
};



class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            height: '',
            weight: '',
            life_span: '',
            image: '',
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.props.loadDogs();
        // console.log('this.props.dogs', this.props.dogs);
        const dog = this.props.dogs.find(dog =>
            String(dog.id) === this.props.match.params.id);
        this.setState({
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            image: dog.image,
        });
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        const errors = validateInput(this.state);
        if (Object.keys(errors).length) {
            this.setState({ errors });
        } else {
            this.props.modifyDog(this.props.match.params.id, this.state);
            alert('Dog modified successfully!');
            this.props.loadDogs();
            this.props.history.push('/home');
        };
    };

    render() {
        return (
            <div id="edit-container">
                <form onSubmit={this.handleSubmit}>
                    <div id="edit-form-fields">
                        <div id="input-div">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                            {
                                this.state.errors.name && (
                                    <span className='errors-span'>
                                        {this.state.errors.name}
                                    </span>)
                            }
                        </div>
                        <div id="input-div">
                            <label htmlFor="height">Height</label>
                            <input

                                type="text"
                                name="height"
                                value={this.state.height}
                                onChange={this.handleChange}
                            />
                            {
                                this.state.errors.height && (
                                    <span className='errors-span'>
                                        {this.state.errors.height}
                                    </span>)
                            }
                        </div>
                        <div id="input-div">
                            <label htmlFor="weight">Weight</label>
                            <input
                                type="text"
                                name="weight"
                                value={this.state.weight}
                                onChange={this.handleChange}
                            />
                            {
                                this.state.errors.weight && (
                                    <span className='errors-span'>
                                        {this.state.errors.weight}
                                    </span>)
                            }
                        </div>
                        <div id="input-div">
                            <label htmlFor="life_span">Life Span</label>
                            <input
                                type="text"
                                name="life_span"
                                value={this.state.life_span}
                                onChange={this.handleChange}
                            />
                            {
                                this.state.errors.life_span && (
                                    <span className='errors-span'>
                                        {this.state.errors.life_span}
                                    </span>)
                            }
                        </div>
                        <div id="input-div">
                            <label htmlFor="image">Image</label>
                            <input
                                type="text"
                                name="image"
                                value={this.state.image}
                                onChange={this.handleChange}
                            />
                        </div>
                        {
                            this.state.errors.image && (
                                <span className='errors-span'>
                                    {this.state.errors.image}
                                </span>)
                        }
                    </div>
                    <div id="edit-form-buttons">
                        <div id="input-div">
                            <button type="submit">Modify Dog</button>
                        </div>
                    </div>
                </form>
                <div className="back-btn">
                    <NavLink to='/home'>
                        <button>GO BACK</button>
                    </NavLink>
                </div>
            </div>
        );
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        loadDogs: () => dispatch(loadDogs()),
        modifyDog: (id, dog) => dispatch(modifyDog(id, dog)),
    };
};

const mapStateToProps = (state) => {
    // console.log('state', state);
    return {
        dogs: state.allDogs,
    };
};

export default withHistory(connect(mapStateToProps, mapDispatchToProps)(Edit));
