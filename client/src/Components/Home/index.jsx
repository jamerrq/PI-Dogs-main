import React from 'react';
import './styles.css';

// NavBar Component
import NavBar from '../NavBar';
// Footer Component
import Footer from '../Footer';
// Pagination Component
import Pags from '../Pags';


class Home extends React.Component {

    render() {
        return (
            <div className='home'>
                <NavBar />
                <Pags></Pags>
                <Footer />
            </div>
        );
    };

};


export default Home;
