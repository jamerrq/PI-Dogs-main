import React from 'react';
import './styles.css';

// NavLink
import { NavLink } from 'react-router-dom';

// TbDog
import { TbDog } from 'react-icons/tb';

// Environtment Variables
// const { API_ELEMS } = process.env;


class Landing extends React.Component {

    render() {
        return (
            <div className='landing'>
                {/* <h1 className='title'>LANDING PAGE</h1> */}
                <NavLink to='/home'>
                    <button id="landing-button">
                        <TbDog style={{ fontSize: "22px" }} />
                        &nbsp;GO HOME&nbsp;
                        <TbDog style={{ fontSize: "22px" }} />
                    </button>
                </NavLink>
            </div>
        );
    };

};


export default Landing;
