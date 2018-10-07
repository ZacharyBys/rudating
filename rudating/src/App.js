import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MakeProfile from './pages/MakeProfile';
import Login from './pages/Login';
import Lobby from './pages/Lobby';
import NumbersPage from './pages/NumbersPage';

import 'semantic-ui-css/semantic.min.css';
import './App.css'

class App extends Component {
	render() {
		return (
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={LandingPage}/>
						<Route path="/start" component={MakeProfile}/>
						<Route path="/lobby" component={Lobby}/>
                        <Route path="/login" component={Login}/>
						<Route path="/numbers" component={NumbersPage}/>
					</Switch>
				</BrowserRouter>
			)
		}
	}
	
export default App;
	