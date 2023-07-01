import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";


class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found">
                <h1>404</h1>
                <h2>Page (or Dog) not found</h2>
                <NavLink to="/home">
                    <button>Back to Home</button>
                </NavLink>
            </div>
        )
    };
};

export default NotFound;
