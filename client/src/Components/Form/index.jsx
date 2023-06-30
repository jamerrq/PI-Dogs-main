import React from 'react';
import './styles.css';

import { connect } from 'react-redux';
import { createDog, loadDogs } from '../../Redux/actions';

import { NavLink } from 'react-router-dom';

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
    if (!input.temperaments.length) {
        errors.temperaments = 'AT LEAST ONE TEMPERAMENT IS REQUIRED';
    };
    return errors;
};


let imgUrl =
    'https://m.media-amazon.com/images/I/61JNFVu5U+L._AC_UF1000,1000_QL80_.jpg';


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '@HENRY',
            height: '100 - 200',
            weight: '1 - 2',
            life_span: '1 - 2 years',
            temperaments: [],
            image: imgUrl,
            errors: {
                name: 'NAME IS REQUIRED',
                height: 'HEIGHT IS REQUIRED',
                weight: 'WEIGHT IS REQUIRED',
                life_span: 'LIFE SPAN IS REQUIRED',
                image: 'IMAGE IS REQUIRED',
                temperaments: 'AT LEAST ONE TEMPERAMENT IS REQUIRED',
            },
        };
    };

    componentDidMount() {
        this.setState({
            ...this.state,
            errors: validateInput(this.state),
        });
    };

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
            errors: validateInput({
                ...this.state,
                [e.target.name]: e.target.value,
            }),
        });
    };

    handleSelect = (e) => {
        let temperaments = this.state.temperaments;
        if (e.target.checked) {
            temperaments.push(e.target.value);
        };
        if (!e.target.checked) {
            temperaments = temperaments.filter(
                temperament => temperament !== e.target.value);
        };
        this.setState({
            ...this.state,
            temperaments: temperaments,
            errors: validateInput({
                ...this.state,
                temperaments: temperaments,
            }),
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (!Object.values(this.state.errors).length) {
            createDog({
                name: this.state.name,
                height: this.state.height,
                weight: this.state.weight,
                life_span: this.state.life_span,
                temperaments: this.state.temperaments,
                image: this.state.image,
            })(this.props.dispatch);
            this.setState({
                name: '',
                height: '',
                weight: '',
                life_span: '',
                temperaments: [],
                image: '',
                errors: {
                    name: 'NAME IS REQUIRED',
                    height: 'HEIGHT IS REQUIRED',
                    weight: 'WEIGHT IS REQUIRED',
                    life_span: 'LIFE SPAN IS REQUIRED',
                    image: 'IMAGE IS REQUIRED',
                    temperaments: 'AT LEAST ONE TEMPERAMENT IS REQUIRED',
                },
            });
            alert('Dog created successfully!');
            // dispatch loadDogs
            loadDogs()(this.props.dispatch);
        }
        else {
            alert('Please fill all the fields correctly');
        };
    };

    render() {
        return (
            <div id="form-container">
                <form onSubmit={this.handleSubmit}>
                    <div id="form-fields">
                        <div id="left-side">
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
                        <div id="right-side">
                            <div id="input-div">
                                <label htmlFor="temperaments">Temperaments</label>
                                {/** Checkboxes */}
                                <div id="temperaments-container">
                                    {
                                        this.props.temperaments.map(
                                            (temperament, index) => {
                                                return (
                                                    <div key={index}
                                                        className="checkbox-container">
                                                        <input
                                                            type="checkbox"
                                                            name="temperaments"
                                                            value={temperament}
                                                            onChange={this.handleSelect}
                                                        />
                                                        <label htmlFor="temperaments">
                                                            {temperament}</label>
                                                    </div>
                                                );
                                            })
                                    }
                                </div>
                                {
                                    this.state.errors.temperaments && (
                                        <span className='errors-span'>
                                            {this.state.errors.temperaments}
                                        </span>)
                                }
                            </div>
                        </div>
                    </div>
                    <div id="form-buttons">
                        <div id="input-div">
                            <button type="submit">Create Dog</button>
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
    };

};


const mapStateToProps = (state) => {
    return {
        temperaments: state.temperaments,
    };
};


export default connect(mapStateToProps)(Form);
