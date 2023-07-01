// App global styles
import './App.css';
// Components
import Landing from './Components/Landing';
import Home from './Components/Home';
import Detail from './Components/Cards/Detail';
import Form from './Components/Form';
import Edit from './Components/Edit';
import NotFound from './Components/NotFound';
// Routes stuff
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Redux actions
import * as actions from './Redux/actions';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.loadDogs());
        dispatch(actions.loadTemperaments());
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/detail/:id" component={Detail}></Route>
                    <Route path="/create" component={Form}></Route>
                    <Route path="/edit/:id" component={Edit}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </Router>
        </div>
    );
};


export default App;
